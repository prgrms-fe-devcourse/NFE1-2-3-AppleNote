import { httpClient } from "@common/api/fetch";

export interface User {
  bannerImage: string | null;
}

export const fetchBannerImage = async (): Promise<string | null> => {
  const URL = "users/me";
  const { data } = await httpClient.get<{ payload: User }>(URL);

  return data.payload.bannerImage;
};
