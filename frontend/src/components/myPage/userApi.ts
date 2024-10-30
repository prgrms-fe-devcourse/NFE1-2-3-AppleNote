import { httpClient } from "@common/api/fetch";

export type User = {
  name: string;
  email: string;
  profileImage: string;
  bannerImage: string;
};
interface PasswordForm {
  oldPassword: string;
  newPassword: string;
}
export const getUser = async (): Promise<User> => {
  try {
    const URL = `/users/me`;

    const { data } = await httpClient.get(URL);

    return data.payload;
  } catch {
    throw new Error("유저 정보를 가져오는 데 실패했습니다.");
  }
};

// 비밀번호 변경 API
export const changePassword = async (payload: PasswordForm): Promise<boolean> => {
  try {
    const URL = `/users/password`;

    const { data } = await httpClient.patch(URL, payload);

    return data.payload.isChange;
  } catch {
    return false;
  }
};

// 회원 탈퇴 API
export const deleteUser = async (): Promise<boolean> => {
  try {
    const URL = `/users/me`;
    const { data } = await httpClient.delete(URL);

    return data.payload.isRemove;
  } catch {
    return false;
  }
};
