export class NetworkError extends Error {
  constructor(message: string = 'Solicitud incorrecta') {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}
