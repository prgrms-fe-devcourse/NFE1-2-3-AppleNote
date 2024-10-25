import { ErrorStatus } from "@src/types/errorStatus";

export class PostError extends Error {
  statusCode: ErrorStatus;

  constructor(message: string, statusCode: ErrorStatus) {
    super(message);

    this.name = this.constructor.name; // "PostError"
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
