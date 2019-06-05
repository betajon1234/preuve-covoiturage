import { Parents, Container, Exceptions, Providers, Types, Interfaces } from '@pdc/core';
import { CryptoProviderInterfaceResolver } from '@pdc/provider-crypto';

import { User } from '../entities/User';
import { UserRepositoryProviderInterfaceResolver } from '../interfaces/UserRepositoryProviderInterface';
import { NewUserInterface, UserDbInterface } from '../interfaces/UserInterfaces';
import { UserPermissionsProviderInterfaceResolver } from '../interfaces/UserPermissionsProviderInterface';


@Container.handler({
  service: 'user',
  method: 'create',
})
export class CreateUserAction extends Parents.Action {
  public readonly middlewares: (string|[string, any])[] = [
    ['validate', 'user.create'],
    ['scopeIt', [['user.create'], [
      (params, context) => {
        if ('aom' in params && params.aom === context.call.user.aom) {
          return 'aom.users.add';
        }
      },
      (params, context) => {
        if ('operator' in params && params.aom === context.call.user.aom) {
          return 'operator.users.add';
        }
      },
    ]]],
  ];
  constructor(
    private userRepository: UserRepositoryProviderInterfaceResolver,
    private cryptoProvider: CryptoProviderInterfaceResolver,
    private userPermissions: UserPermissionsProviderInterfaceResolver,
    private config: Providers.ConfigProvider,
    private kernel: Interfaces.KernelInterfaceResolver,
  ) {
    super();
  }

  public async handle(request: NewUserInterface , context: Types.ContextType): Promise<UserDbInterface> {
    // check if the user exists already
    const foundUser = await this.userRepository.findByEmail(request.email);
    if (foundUser) {
      throw new Exceptions.DDBConflictException('email conflict');
    }

    if ('operator' in request && 'aom' in request) {
      throw new Exceptions.InvalidRequestException('Cannot assign operator and AOM at the same time');
    }


    // todo: create fullname ?
    const payload: any = {
      email: request.email,
      firstname : request.firstname,
      lastname : request.lastname,
      group : request.group,
      role : request.role,
      phone: request.phone,
      status : 'invited',
      password : await this.cryptoProvider.cryptPassword(request.password),
      requester : context.call.user.fullname,
    };


    const op = request.operator;
    const ao = request.aom;

    if (op) {
      payload.operator = op;
    } else if (ao) {
      payload.aom = ao;
    }

    // create the new user
    let user = new User(payload);
    user.permissions = this.config.get(`permissions.${user.group}.${user.role}`);

    user = await this.userRepository.create(user);

    // generate new token for a password reset on first access
    return this.forgottenPassword(
      {
        email: payload.email,
        invite: {
          requester: payload.requester,
          organisation: payload.organisation,
        },
      },
      user,
    );
  }

  // todo: put this in authentification ?
  private async forgottenPassword(invite, user) {
    // search for user
    if (!user) {
      throw new Exceptions.DDBNotFoundException();
    }
    const reset = this.cryptoProvider.generateToken();
    const token = this.cryptoProvider.generateToken();

    user.forgottenReset = reset;
    user.forgottenToken = token;
    user.forgottenAt = new Date();
    const updatedUser = await this.userRepository.update(user);

    this.kernel.notify(
      'notification:sendTemplateEmail', 
      {
        template: 'invite',
        email: user.email,
        fullName: user.fullName,
        opts: {
          requester,
          organization,
          link,
        },
      },
      {
        call: context.call,
        channel: {
          ...context.channel,
          service: 'user',
        },
      },
    );

    // send the email
    // user.invite(reset, token, invite.requester, invite.organisation);

    return updatedUser;
  }

  // todo: put this in authentification ?
  private async forgottenPassword({ email, invite }, userCache = null) {
    // search for user
    const user = userCache || (await this.userRepository.findByEmail(email));
    if (!user) {
      // throw new NotFoundError();
    }

    const reset = this.randomProvider.generateToken();
    const token = this.randomProvider.generateToken();

    user.forgottenReset = reset;
    user.forgottenToken = token;
    user.forgottenAt = new Date();
    const updatedUser = await this.userRepository.update(user);

    // send the email
    // user.invite(reset, token, invite.requester, invite.organisation);

    return updatedUser;
  }
}
