// tslint:disable: no-unused-expression
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';

import { MockApplicationRepository } from './mocks/MockApplicationRepository';

import { Application } from '../src/entities/Application';
import { CheckApplicationAction } from '../src/actions/CheckApplicationAction';
import { CreateApplicationAction } from '../src/actions/CreateApplicationAction';
import { RevokeApplicationAction } from '../src/actions/RevokeApplicationAction';

chai.use(chaiAsPromised);
const { expect } = chai;

let app: Application;
let checkAction;
let createAction;
let revokeAction;
const operatorId = '5d237152497b55cdae5b1412';

describe('CreateApplicationAction', () => {
  before(() => {
    checkAction = new CheckApplicationAction(new MockApplicationRepository());
    createAction = new CreateApplicationAction(new MockApplicationRepository());
    revokeAction = new RevokeApplicationAction(new MockApplicationRepository());
  });

  it('creates an application', async () => {
    app = await createAction.handle({
      operatorId,
      name: 'Test app',
    });

    expect(app).to.have.property('_id');
    expect(app).to.have.property('operatorId', operatorId);
  });

  it('checks the application', async () => {
    const exists = await checkAction.handle({
      operatorId,
      _id: app._id,
    });

    expect(exists).to.be.eq(true);
  });

  it('revokes the application', async () => {
    const revoked = await revokeAction.handle({
      operatorId,
      _id: app._id,
    });

    expect(revoked).to.have.property('_id');
    expect(revoked).to.have.property('deletedAt');
    expect(revoked.deletedAt).to.be.an.instanceof(Date);
  });
});
