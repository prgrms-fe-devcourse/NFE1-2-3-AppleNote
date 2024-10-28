import { createContext, Dispatch, PropsWithChildren, useEffect, useMemo, useReducer } from "react";

import { AuthLocalStorage, authLocalStorage, AuthLocalStorageInitial } from "./localStorage";
import { LoginResponse } from "./api";
import { setDefaultsHeaderAuth } from "@common/api/fetch";

interface AuthState {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  rememberMe: boolean;
  message: string;
}

const initialAuth: AuthState = {
  email: "",
  username: "",
  password: "",
  passwordConfirm: "",
  rememberMe: false,
  message: "",
};

const ACTION_TYPES = {
  EMAIL: "EMAIL",
  USERNAME: "USERNAME",
  PASSWORD: "PASSWORD",
  PASSWORD_CONFIRM: "PASSWORD_CONFIRM",
  REMEMBER_ME: "REMEMBER_ME",
  MESSAGE: "MESSAGE",
} as const;

type AuthAction =
  | { type: typeof ACTION_TYPES.EMAIL; payload: string }
  | { type: typeof ACTION_TYPES.USERNAME; payload: string }
  | { type: typeof ACTION_TYPES.PASSWORD; payload: string }
  | { type: typeof ACTION_TYPES.PASSWORD_CONFIRM; payload: string }
  | { type: typeof ACTION_TYPES.REMEMBER_ME; payload: boolean }
  | { type: typeof ACTION_TYPES.MESSAGE; payload: string };

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case ACTION_TYPES.EMAIL:
      return { ...state, email: action.payload };
    case ACTION_TYPES.USERNAME:
      return { ...state, username: action.payload };
    case ACTION_TYPES.PASSWORD:
      return { ...state, password: action.payload };
    case ACTION_TYPES.PASSWORD_CONFIRM:
      return { ...state, passwordConfirm: action.payload };
    case ACTION_TYPES.REMEMBER_ME:
      return { ...state, rememberMe: action.payload };
    case ACTION_TYPES.MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

interface AuthFormContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const AuthFormContext = createContext<AuthFormContextType | undefined>(undefined);

/**
 * 로그인/회원가입 폼 입력 관리 컨텍스트 프로바이더
 */
export const AuthFormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuth);

  return (
    <AuthFormContext.Provider value={{ state, dispatch }}>{children}</AuthFormContext.Provider>
  );
};

interface AuthContextType {
  login: (payload: LoginResponse, callback: CallbackFn) => void;
  logout: (callback: CallbackFn) => void;
}

interface CallbackFn {
  onSuccess: () => void;
  onFailure?: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 사용자 로그인 정보 상태 컨텍스트 프로바이더
 */
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const login = ({ payload }: LoginResponse, { onSuccess, onFailure }: CallbackFn) => {
    if (saveAuthData(payload)) {
      return onSuccess && onSuccess();
    }

    return onFailure && onFailure();
  };

  const logout = ({ onSuccess, onFailure }: CallbackFn) => {
    if (removeAuthData()) {
      return onSuccess && onSuccess();
    }

    return onFailure && onFailure();
  };

  useEffect(() => {
    saveAuthData(authLocalStorage.get());
  }, []);

  const value = useMemo(() => ({ login, logout }), []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * 요청 헤더와 스토리지에 사용자 로그인 정보를 저장한다.
 *
 * @returns 작업이후 성공 여부에 따라 true/false를 반환.
 */
const saveAuthData = (data: AuthLocalStorage | undefined) => {
  const { accessToken, userId } = data || AuthLocalStorageInitial;

  if (accessToken && userId) {
    setDefaultsHeaderAuth(accessToken);
    authLocalStorage.set({ accessToken, userId });

    return true;
  }

  return false;
};

/**
 * 요청 헤더와 스토리지에 사용자 로그인 정보를 삭제한다.
 *
 * @returns 작업이후 성공 여부에 따라 true/false를 반환.
 */
const removeAuthData = () => {
  try {
    setDefaultsHeaderAuth("");
    authLocalStorage.remove();

    return true;
  } catch {
    return false;
  }
};
