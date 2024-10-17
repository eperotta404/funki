export interface SessionStorage {
  get(key: string):string | null;
  store(key: string, value: string): void;
  remove(key: string): void;
  hasSession(): boolean
}
