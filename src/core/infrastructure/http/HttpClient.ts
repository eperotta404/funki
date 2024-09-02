import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/config-global';

import { NetworkError } from './NetworkError';
import { HttpJsonError } from './HttpJsonError';
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
    const accessToken = this.session.get()
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

  async post(url: string, jsonBody: Record<string, unknown>): Promise<any> {
    try {
      return await this.http.post(url, JSON.stringify(jsonBody), this.configWithAuthHeader());
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
    throw new HttpJsonError(e.response.status, e.response.data);
  }
}
