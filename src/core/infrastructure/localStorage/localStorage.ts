import type { SessionStorage } from 'src/core/domain/models/sessionStorage';

import { STORAGE_KEY } from 'src/components/settings';

export class LocalStorage implements SessionStorage {
  get(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  store(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  remove(key: string):void {
    sessionStorage.removeItem(key);
  }

  hasSession():boolean {
    const token = sessionStorage.getItem(STORAGE_KEY);
    return !!token;
  }
}
