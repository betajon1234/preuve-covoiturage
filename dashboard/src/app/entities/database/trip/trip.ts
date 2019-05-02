/* tslint:disable:variable-name*/


import { Person } from '~/entities/database/trip/person';
import { Incentive } from '~/entities/database/Incentive/incentive';
import { Operator } from '~/entities/database/operator';

export class Trip {
  public _id: number;
  public operator: Operator;
  public operator_journey_id: string;
  public status: { 'pending', 'active', 'error' };
  public start: Date;
  public people: [Person];
  public incentives: [Incentive];
  public createdAt: string;


  constructor(obj?: any) {
    this._id = obj && obj._id || null;
    this.operator = obj && obj.operator || null;
    this.operator_journey_id = obj && obj.operator_journey_id || null;
    this.status = obj && obj.status || null;
    this.start = obj && obj.start || null;
    this.people = obj && obj.people || null;
    this.incentives = obj && obj.incentives || null;
    this.createdAt = obj && obj.createdAt || null;
  }
}

