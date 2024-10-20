import { BASE_URL } from "@common/api/fetch";
import { http, HttpResponse, HttpResponseResolver } from "msw";

type UserResponse = {
  statusCode: number;
  payload: {
    accessToken: string;
    userId: string;
    name: string;
    email: string;
    bannerImage: string | null;
    profileImage: string | null;
  };
};

const handleUserRequest = (
  url: string,
  method: keyof typeof http,
  resolver: HttpResponseResolver<never, never, UserResponse>
) => {
  return http[method](url, resolver);
};

export const handlers = [
  handleUserRequest(`${BASE_URL}/users/me`, "get", async () => {
    return HttpResponse.json({
      statusCode: 200,
      payload: {
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamVvbmdiYWViYW5nIiwidXNlcklkIjoiODkzN2MzZWUtN2I5NS00Njg4LWI3ZmUtOWMyZjE5MGU1M2RhIn0.D0oyvTrwN169uG9VvDvUpXgzD5Nio512ROlACguWLSs",
        userId: "8937c3ee-7b95-4688-b7fe-9c2f190e53da",
        name: "jeongbae",
        email: "jeongbae@gmail.com",
        bannerImage: null,
        profileImage: null,
      },
    });
  }),
];
