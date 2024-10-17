export class User {
  private _id: string = '1';

  private _email: string = 'admin@fanki.co';

  private _avatar: string = '';

  private _roles: string[] = [];

  private _sportOrganizationsIds: string[] = [];

  constructor(id: string, email: string, roles: string[], sportOrganizationsIds: string[]) {
    this._id = id;
    this._email = email;
    this._roles = roles;
    this._sportOrganizationsIds = sportOrganizationsIds;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get avatar(): string {
    return this._avatar;
  }

  get roles(): string[] {
    return this._roles;
  }

  get sportOrganizationsIds(): string[] {
    return this._sportOrganizationsIds;
  }
}


