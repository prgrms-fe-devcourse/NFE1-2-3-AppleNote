import { httpClient } from "@common/api/fetch";

export interface User {
  profileImage: string | null;
}

export const fetchUserData = async (): Promise<string | null> => {
  const URL = "users/me";
  const { data } = await httpClient.get<{ payload: User }>(URL);

  return data.payload.profileImage;
};
