import { Parents, Container, Extensions, Interfaces } from '@ilos/core';
import { ConfigExtension } from '@ilos/config';
import { ConnectionManagerExtension } from '@ilos/connection-manager';
import { PermissionMiddleware } from '@ilos/package-acl';
import { MongoConnection } from '@ilos/connection-mongo';
import { ValidatorExtension, ValidatorMiddleware } from '@pdc/provider-validator';

import { ApplicationRepositoryProvider } from './providers/ApplicationRepositoryProvider';

import { CreateApplicationAction, RevokeApplicationAction, CheckApplicationAction } from './actions';
import { applicationCheckSchema, applicationCreateSchema, applicationRevokeSchema } from './schemas';

@Container.serviceProvider({
  config: __dirname,
  providers: [ApplicationRepositoryProvider],
  validator: [
    ['application.check', applicationCheckSchema],
    ['application.create', applicationCreateSchema],
    ['application.revoke', applicationRevokeSchema],
  ],
  handlers: [CheckApplicationAction, CreateApplicationAction, RevokeApplicationAction],
  connections: [MongoConnection, 'mongo'],
  middlewares: [['can', PermissionMiddleware], ['validate', ValidatorMiddleware]],
})
export class ServiceProvider extends Parents.ServiceProvider {
  readonly extensions: Interfaces.ExtensionStaticInterface[] = [
    ConfigExtension,
    ConnectionManagerExtension,
    ValidatorExtension,
    Extensions.Middlewares,
    Extensions.Providers,
    Extensions.Handlers,
  ];
}
