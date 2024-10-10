export class UserLogin {
  private _id: number = 1;

  private _email: string = 'admin@fanki.co';

  private _avatar: string = '';

  get id(): number {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get avatar(): string {
    return this._avatar;
  }
}


