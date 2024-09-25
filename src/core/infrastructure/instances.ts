
import { AuthApi } from './api/AuthApi';
import { EventApi } from './api/EventAPi';
import { HttpClient } from './http/HttpClient';
import { OrganizationApi } from './api/OrganizationApi';
import { LocalStorage } from './localStorage/localStorage';
import { AuthService } from '../domain/services/AuthService';
import { EventService } from '../domain/services/EventService';
import { OrganizationService } from '../domain/services/OrganizationService';

export const session = new LocalStorage();

const httpClient = new HttpClient(session);
const authApi = new AuthApi(httpClient);
const organizationApi = new OrganizationApi(httpClient);
const eventApi = new EventApi(httpClient);

export const authService = new AuthService(authApi);
export const organizationService = new OrganizationService(organizationApi);
export const eventService = new EventService(eventApi);

