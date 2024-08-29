export class HttpJsonError extends Error {
  public statusCode: number;

  public data: any;

  constructor(statusCode: number = 500, data: any = null) {
    super(`HTTP Error ${statusCode}: ${data?.message || 'Unknown Error'}`);
    this.statusCode = statusCode;
    this.data = data;
    this.name = 'HttpJsonError';
    Object.setPrototypeOf(this, HttpJsonError.prototype);
  }
}
