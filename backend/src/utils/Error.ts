import { ErrorStatus } from "@src/types/errorStatus";

export class PostError extends Error {
  statusCode: ErrorStatus;

  constructor(message: string, statusCode: ErrorStatus) {
    super(message);
    this.name = "PostError";
    this.statusCode = statusCode;
  }
}
