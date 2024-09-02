export interface SessionStorage {
  get():string | null;
  store(value: string): void;
  remove(): void;
  hasSession(): boolean
}
