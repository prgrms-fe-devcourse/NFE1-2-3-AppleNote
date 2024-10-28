import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";

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

interface ThemeContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * 로그인/회원가입 상태 관리 컨텍스트 프로바이더
 */
export const AuthFormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuth);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
