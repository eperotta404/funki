import { UserApi } from './api/UserApi';
import { HttpClient } from './http/HttpClient';
import { UserService } from '../domain/services/UserService';

const httpClient = new HttpClient();
const userApi = new UserApi(httpClient);

export const userService = new UserService(userApi);
