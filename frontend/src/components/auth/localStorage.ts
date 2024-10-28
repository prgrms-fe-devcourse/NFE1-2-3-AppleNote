import { localStorageHelper } from "@common/utils/localStorageHelper";

const AUTH_STORAGE_KEY = "user";
const EMAIL_STORAGE_KEY = "login_email";

export interface AuthLocalStorage {
  accessToken: string;
  userId: string;
}

export const AuthLocalStorageInitial: AuthLocalStorage = {
  accessToken: "",
  userId: "",
};

/**
 * 사용자 인증 정보 유지 상태 스토리지
 */
export const authLocalStorage = localStorageHelper<AuthLocalStorage>(
  AUTH_STORAGE_KEY,
  AuthLocalStorageInitial
);

interface EmailLocalStorage {
  isSave: boolean;
  email: string;
}

/**
 * 사용자 입력 이메일 유지 상태 스토리지
 */
export const emailLocalStorage = localStorageHelper<EmailLocalStorage>(EMAIL_STORAGE_KEY, {
  isSave: false,
  email: "",
});
