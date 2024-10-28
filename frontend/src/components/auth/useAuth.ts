import { useContext } from "react";
import { AuthContext, AuthFormContext } from "./AuthContext";

/**
 * 로그인/회원가입 폼 양식 상태 괸리 훅
 */
export const useAuthForm = () => {
  const context = useContext(AuthFormContext);

  if (!context) {
    throw new Error("useAuthForm must be used within a AuthFormProvider");
  }

  const dispatch = {
    email: (payload: string) => {
      context.dispatch({ type: "EMAIL", payload });
    },
    username: (payload: string) => {
      context.dispatch({ type: "USERNAME", payload });
    },
    password: (payload: string) => {
      context.dispatch({ type: "PASSWORD", payload });
    },
    passwordConfirm: (payload: string) => {
      context.dispatch({ type: "PASSWORD_CONFIRM", payload });
    },
    rememberMe: (payload: boolean) => {
      context.dispatch({ type: "REMEMBER_ME", payload });
    },
    message: (payload: string) => {
      context.dispatch({ type: "MESSAGE", payload });
    },
  };

  return { state: context.state, dispatch };
};

/**
 * 로그인 상태 관리 훅
 *
 * `login` - 함수를 호출하면 로그인 정보를 브라우저에 저장합니다.
 *
 * `logout` - 함수를 호출하면 로그인 정보를 브라우저에서 삭제합니다.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
