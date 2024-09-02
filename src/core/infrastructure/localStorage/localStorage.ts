import type { SessionStorage } from 'src/core/domain/models/sessionStorage';

import { STORAGE_KEY } from 'src/components/settings';

export class LocalStorage implements SessionStorage {
  get(): string | null {
    return sessionStorage.getItem(STORAGE_KEY);
  }

  store(value: string): void {
    sessionStorage.setItem(STORAGE_KEY, value);
  }

  remove():void {
    sessionStorage.removeItem(STORAGE_KEY);
  }

  hasSession():boolean {
    const token = sessionStorage.getItem(STORAGE_KEY);
    return !!token;
  }
}
