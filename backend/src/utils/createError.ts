import { ErrorStatus } from "@src/types/errorStatus";

export const createErrorResponse = (statusCode: ErrorStatus, message: string) => ({
  error: {
    statusCode,
    message,
  },
});

export const createSuccessResponse = <P>(statusCode: ErrorStatus, payload: P) => ({
  statusCode,
  payload,
});
