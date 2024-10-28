import { httpClient, BASE_URL } from "@common/api/fetch";

export interface User {
  profileImage: string | null;
}

export const fetchUserData = async (): Promise<User> => {
  const response = await httpClient.get<User>(`${BASE_URL}/users/me`);

  return response.data;
};
