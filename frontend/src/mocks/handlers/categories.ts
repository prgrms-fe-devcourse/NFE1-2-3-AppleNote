import { BASE_URL } from "@common/api/fetch";
import { http, HttpResponse, HttpResponseResolver } from "msw";

type CategoryResponse = {
  statusCode: number;
  payload: {
    categoryId: string;
    name: string;
  }[];
};

const handleCategoryRequest = (
  url: string,
  method: keyof typeof http,
  resolver: HttpResponseResolver<never, never, CategoryResponse>
) => {
  return http[method](url, resolver);
};

export const handlers = [
  handleCategoryRequest(`${BASE_URL}/categories`, "get", async () => {
    return HttpResponse.json({
      statusCode: 200,
      payload: [
        { categoryId: "0192aa1b-1e1c-7775-ab3a-99a65a243e0f", name: "IT" },
        { categoryId: "0192aa1b-7277-7425-849f-eb52f8ca081c", name: "생활" },
        { categoryId: "d8249a93-ecfd-4f4b-922c-2b034b75c1fe", name: "취미" },
      ],
    });
  }),
];
