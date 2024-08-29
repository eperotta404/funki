export class NotAuthorizedError extends Error {
  constructor(message: string = 'Not Authorized Error') {
    super(message);
    this.name = 'NotAuthorizedError';
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}
