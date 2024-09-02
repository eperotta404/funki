import { UserApi } from './api/UserApi';
import { AuthApi } from './api/AuthApi';
import { HttpClient } from './http/HttpClient';
import { LocalStorage } from './localStorage/localStorage';
import { UserService } from '../domain/services/UserService';
import { AuthService } from '../domain/services/AuthService';

export const session = new LocalStorage();
const httpClient = new HttpClient(session);
const userApi = new UserApi(httpClient);
const authApi = new AuthApi(httpClient);

export const userService = new UserService(userApi);
export const authService = new AuthService(authApi);
