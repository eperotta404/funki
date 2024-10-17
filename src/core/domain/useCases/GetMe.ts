
import type { LocalStorage } from 'src/core/infrastructure/localStorage/localStorage';

import { STORAGE_USER_KEY } from 'src/auth/context/constant';

import { User } from '../models/user';

export class GetMe {
  constructor(private sessionStorage: LocalStorage) {}

  async execute(): Promise<User> {
    const userInfo = this.sessionStorage.get(STORAGE_USER_KEY);
    if (!userInfo) {
      return new User('1', 'admin@fanki.co', [], []);
    }

    const parsedUser = JSON.parse(userInfo);
    return new User(parsedUser._id, parsedUser._email, parsedUser._roles, parsedUser._sportOrganizationsIds);
  }
}
