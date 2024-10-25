import { StatusCode } from "@src/types";

export class ServiceError extends Error {
  statusCode: StatusCode;

  constructor(message: string, statusCode: StatusCode) {
    super(message);

    this.name = this.constructor.name; // "ServiceError"
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
