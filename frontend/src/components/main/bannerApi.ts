import { httpClient } from "@common/api/fetch";

export interface User {
  bannerImage: string | null;
}

export const fetchBannerImage = async (): Promise<string | null> => {
  const response = await httpClient.get<User>("/users/me");

  return response.data.bannerImage;
};
