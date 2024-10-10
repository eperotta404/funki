import type { UserLogin } from "./userLogin";

export interface Login {
  user: UserLogin;
  accessToken: string;
}
