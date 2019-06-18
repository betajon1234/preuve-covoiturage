import { Types, Exceptions } from '@ilos/core';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { UserBaseInterface } from '../interfaces/UserInterfaces';
import { User } from '../entities/User';
import { FilterOutputMiddleware } from './FilterOutputMiddleware';

chai.use(chaiAsPromised);
const { expect, assert } = chai;

const mockConnectedUser = <UserBaseInterface>{
  _id: '1ab',
  email: 'john.schmidt@example.com',
  firstname: 'john',
  lastname: 'schmidt',
  phone: '0624857425',
  group: 'registry',
  role: 'admin',
  permissions: [],
};

const mockUser = new User({
  email: 'edouard.nelson@example.com',
  firstname: 'edouard',
  lastname: 'nelson',
  phone: '0622222233',
  group: 'registry',
  role: 'admin',
  aom: 'aomid',
  permissions: [],
});

const mockListUsers = [
  new User({ ...mockUser, password: 'password1' }),
  new User({ ...mockUser, password: 'password2' }),
];

async function findUser(params, context): Promise<User> {
  return new User({ ...mockUser, password: 'password' });
}

async function listUsers(params, context): Promise<User[]> {
  return mockListUsers;
}

async function listNestedUsers(params, context): Promise<{ data: User[]}> {
  return{ data: mockListUsers };
}


function error(err: Exceptions.RPCException) {
  return {
    status: 200,
    data: {
      jsonrpc: '2.0',
      id: 1,
      error: {
        code: err.rpcError.code,
        message: err.rpcError.message,
        data: err.rpcError.data,
      },
    },
  };
}

function contextFactory(params) {
  return <Types.ContextType>{
    call: {
      user: {
        ...mockConnectedUser,
        ...params,
      },
    },
    channel: {
      service: '',
    },
  };
}

const middleware = new FilterOutputMiddleware();

describe('FILTER OUTPUT MIDDLEWARE - blacklist - model', () => {
  const mockFindUserContext = contextFactory({ permissions: [] });

  it('should filter password from result', async () => {
    const result = await middleware.process({}, mockFindUserContext, findUser, { blackList: ['password'] });
    expect(result).to.not.have.property('password');
  });
});

describe('FILTER OUTPUT MIDDLEWARE - blacklist - array of models', () => {
  const mockFindUserContext = contextFactory({ permissions: [] });

  it('should filter password from list of users', async () => {
    const result = await middleware.process({}, mockFindUserContext, listUsers, { blackList: ['password'] });
    expect(result[0]).to.not.have.property('password');
    expect(result[1]).to.not.have.property('password');
  });
});

describe('FILTER OUTPUT MIDDLEWARE - whitelist - array of models in nested data key', () => {
  const mockFindUserContext = contextFactory({ permissions: [] });

  it('should filter all except firstname & lastname from list of users', async () => {
    const result = await middleware.process(
      {},
      mockFindUserContext,
      listNestedUsers,
      { whiteList: ['firstname', 'lastname'] });
    expect(result.data[0]).to.eql({ firstname: mockUser.firstname, lastname: mockUser.lastname });
    expect(result.data[1]).to.eql({ firstname: mockUser.firstname, lastname: mockUser.lastname });
  });
});
