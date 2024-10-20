import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const httpClient = axios.create({ baseURL: BASE_URL });

/**
 * HTTP 클라이언트의 전역 Authorization 헤더를 구성한다.
 *
 * @param token 사용자 토큰정보
 */
export const setDefaultsHeaderAuth = (token: string) => {
  httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};
