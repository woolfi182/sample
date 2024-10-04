export class BaseException extends Error {
  status = 500;
  payload: Record<string, any>;
  constructor(message: string, payload: Record<string, any>) {
    super(message);
    this.payload = payload;
  }

  getStatus(): number {
    return this.status;
  }
}
