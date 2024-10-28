import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
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
