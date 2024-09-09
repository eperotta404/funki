export class User {
  private _id: number = 1;

  private _name: string = 'admin@fanki.co';

  private _avatar: string = '';

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get avatar(): string {
    return this._avatar;
  }
}


