import { ObjectId } from 'bson';

import { Application } from '../../src/entities/Application';
import { ApplicationRepositoryProviderInterfaceResolver } from '../../src/interfaces';

export class MockApplicationRepository extends ApplicationRepositoryProviderInterfaceResolver {
  private store = new Map();

  async check(params): Promise<boolean> {
    return !!this.store.get(params._id);
  }

  // Create and store an application
  async create(params): Promise<Application> {
    const app = new Application({
      _id: new ObjectId(),
      permissions: ['journey.create'],
      ...params,
    });

    this.store.set(app._id, app);

    return app;
  }

  // Find and soft-delete the application
  async softDelete(params): Promise<Application> {
    const app = this.store.get(params._id);
    if (!app) {
      throw new Error(`Application ${params._id} not found`);
    }

    const deleted = new Application({
      ...app,
      deletedAt: new Date().toISOString(),
    });

    return deleted;
  }
}
