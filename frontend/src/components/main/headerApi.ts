import { httpClient } from "@common/api/fetch";

export interface User {
  profileImage: string | null;
}

export const fetchUserData = async (): Promise<User> => {
  const response = await httpClient.get<User>("/users/me");

  return response.data;
};
