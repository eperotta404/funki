import { UserService } from "../domain/services/UserService";
import { UserApi } from "./api/UserApi";

const userApi = new UserApi();
export const userService = new UserService(userApi);

