import { httpClient } from "@common/api/fetch";

// POST /auth/login (payload)
export interface LoginPayload {
  email: string;
  password: string;
}

// POST /auth/login (response)
export interface LoginResponse {
  statusCode: number;
  payload: {
    accessToken: string;
    userId: string;
    name: string;
    email: string;
    bannerImage: string | null;
    profileImage: string | null;
  };
}

// POST /auth/email (payload)
export interface CheckEmailPayload {
  email: string;
}

// POST /auth/email (response)
export interface CheckEmailResponse {
  statusCode: number;
  payload: string;
}

/**
 * POST /auth/login 로그인
 * @requires Authorization Bearer {access-token}
 * @param payload 로그인 폼 양식
 * @returns 사용자 장보
 */
export const requestLogin = async (payload: LoginPayload): Promise<LoginResponse> => {
  const URL = `/auth/login`;
  const { data } = await httpClient.post(URL, payload);

  return data;
};

/**
 * POST /auth/email 이메일 중복 확인
 * @requires Authorization Bearer {access-token}
 * @param payload 이메일
 * @returns 중복 여부
 */
export const requestCheckEmail = async (
  payload: CheckEmailPayload
): Promise<CheckEmailResponse> => {
  const URL = `/auth/email`;
  const { data } = await httpClient.post(URL, payload);

  return data;
};
