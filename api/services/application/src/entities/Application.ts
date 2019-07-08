import { ApplicationInterface } from '../interfaces';

export class Application implements ApplicationInterface {
  public _id: string;
  public name: string;
  public permissions: string[];
  // tslint:disable-next-line: variable-name
  public created_at: Date;
  // tslint:disable-next-line: variable-name
  public deleted_at?: Date;

  constructor(data: { _id: string; name: string; permissions: string[]; created_at: Date; deleted_at?: Date }) {
    this._id = data._id;
    this.name = data.name;
    this.permissions = data.permissions;
    this.created_at = this.created_at;
    this.deleted_at = this.deleted_at;
  }
}
