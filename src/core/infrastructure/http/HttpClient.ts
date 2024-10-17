import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/config-global';

import { STORAGE_KEY } from 'src/auth/context/constant';

import { NetworkError } from './NetworkError';
import { HttpJsonError } from './HttpJsonError';
import { ForbiddenError } from './ForbiddenError';
import { NotAuthorizedError } from './NotAuthorizedError';
import { InternalServerError } from './InternalServerError';

import type { LocalStorage } from '../localStorage/localStorage';

export class HttpClient {
  private http: AxiosInstance;

  private session: LocalStorage;

  private baseUrl: string = CONFIG.baseApiUrl || '';

  constructor(session: LocalStorage) {
    this.session = session;
    this.http = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
  }

  configWithAuthHeader(): AxiosRequestConfig {
    // eslint-disable-next-line no-debugger
    debugger
    const accessToken = this.session.get(STORAGE_KEY)
    if (!accessToken) { return {}; }
    return {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    };
  }

  async get(url: string): Promise<any> {
    try {
      return await this.http.get(url, this.configWithAuthHeader());
    } catch (e) {
      this.handleError(e);
      return null;
    }
  }

  async post<T>(url: string, jsonBody: T): Promise<any> {
    try {
      return await this.http.post(url, JSON.stringify(jsonBody), this.configWithAuthHeader());
    } catch (e) {
      this.handleError(e);
      return null;
    }
  }

  async put<T>(url: string, jsonBody: T): Promise<any> {
    try {
      return await this.http.put(url, JSON.stringify(jsonBody), this.configWithAuthHeader());
    } catch (e) {
      this.handleError(e);
      return null;
    }
  }


  async delete(url: string): Promise<any> {
    try {
      return await this.http.delete(url, this.configWithAuthHeader());
    } catch (e) {
      this.handleError(e);
      return null;
    }
  }

  private handleError(e: any): void {
    if (!e.response) {
      throw new NetworkError('Network Errot');
    }
    if (e.response.status === 500) {
      throw new InternalServerError('Internal Server Error');
    }
    if (e.response.status === 400) {
      throw new NetworkError('Network Error');
    }
    if (e.response.status === 401) {
      throw new NotAuthorizedError('Not Authorized Error');
    }
    if (e.response.status === 403) {
      throw new ForbiddenError('Forbidden Error');
    }
    throw new HttpJsonError(e.response.status, e.response.data);
  }
}
