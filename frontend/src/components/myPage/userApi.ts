import { authLocalStorage } from "@components/auth/localStorage";
import axios from "axios";

// 비밀번호 변경 API
export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<boolean> => {
  const { accessToken } = authLocalStorage.get(); // 로컬 스토리지에서 JWT 토큰 가져오기

  if (!accessToken) {
    throw new Error("토큰이 존재하지 않습니다."); // 토큰이 없을 경우 오류 처리
  }

  try {
    const response = await axios.patch(
      "/users/password",
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.payload.isChanged; // 비밀번호 변경 성공
  } catch {
    return false;
  }
};

// 회원 탈퇴 API
export const deleteUser = async (): Promise<boolean> => {
  const { accessToken } = authLocalStorage.get(); // 로컬 스토리지에서 JWT 토큰 가져오기

  if (!accessToken) {
    throw new Error("토큰이 존재하지 않습니다.");
  }

  try {
    const response = await axios.delete("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.status === 200; // 200이면 성공으로 간주
  } catch {
    return false; // 오류 발생 시 false 반환
  }
};
