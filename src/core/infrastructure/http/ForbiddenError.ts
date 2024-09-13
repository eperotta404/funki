export class ForbiddenError extends Error {
  constructor(message: string = 'Forbidden Error') {
    super(message);
    this.name = 'ForbiddenError';
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
