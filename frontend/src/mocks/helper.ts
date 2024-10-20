import { DefaultBodyType, HttpResponse, StrictRequest } from "msw";

export const validateContentBody = async (conditional: boolean, message: string) => {
  const status = 422;

  if (conditional) {
    throw new HttpResponse(
      JSON.stringify({
        error: {
          statusCode: status,
          message,
        },
      }),
      {
        status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const validateContentType = async (
  request: StrictRequest<DefaultBodyType>,
  expectedType = "application/json"
) => {
  const status = 400;
  const contentType = request.headers.get("Content-Type") || "";

  if (!contentType.includes(expectedType)) {
    throw new HttpResponse(
      JSON.stringify({
        error: {
          statusCode: status,
          message: `Content-Type must be ${expectedType}`,
        },
      }),
      {
        status,
        headers: { "Content-Type": expectedType },
      }
    );
  }
};
