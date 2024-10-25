import { StatusCode } from "@src/types";

export const createErrorResponse = (statusCode: StatusCode, message: string) => ({
  error: {
    statusCode,
    message,
  },
});

export const createSuccessResponse = <P>(statusCode: StatusCode, payload: P) => ({
  statusCode,
  payload,
});
