import type { AxiosInstance } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/config-global';

import { NetworkError } from './NetworkError';
import { HttpJsonError } from './HttpJsonError';

export class HttpClient {
  private http: AxiosInstance;

  private baseUrl: string = CONFIG.baseApiUrl || '';

  constructor() {
    this.http = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
  }

  async get(url: string): Promise<any> {
    try {
      return await this.http.get(url);
    } catch (e) {
      this.handleError(e);
      return null;
    }
  }

  async post(url: string, jsonBody: Record<string, unknown>): Promise<any> {
    try {
      return await this.http.post(url, JSON.stringify(jsonBody));
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
      throw new HttpJsonError();
    }
    if (e.response.status === 400) {
      throw new NetworkError('Network Errot');
    }
    throw new HttpJsonError(e.response.status, e.response.data);
  }
}
