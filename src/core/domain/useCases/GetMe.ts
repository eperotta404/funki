
import type { LocalStorage } from 'src/core/infrastructure/localStorage/localStorage';

import { User } from '../models/user';

export class GetMe {
  constructor(private sessionStorage: LocalStorage) {}

  async execute(): Promise<User> {
    const userInfo = this.sessionStorage.get('user');
    // eslint-disable-next-line no-debugger
    debugger

    if (!userInfo) {
      return new User('1', 'admin@fanki.co', [], []);
    }

    const parsedUser = JSON.parse(userInfo);
    return new User(parsedUser._id, parsedUser._email, parsedUser._roles, parsedUser._sportOrganizationsIds);
  }
}
