import type { User } from "./user";

export interface Login {
  user: User;
  accessToken: string;
}
