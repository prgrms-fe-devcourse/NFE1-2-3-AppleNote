import { createContext, PropsWithChildren, useRef, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { darkTheme, lightTheme } from "@common/styles/theme.ts";
import { GlobalStyle } from "./GlobalStyle";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  themeType: ThemeType;
  toggleTheme: () => void;
}

export const CustomThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const CustomThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const isFirstTransition = useRef(false); // 첫 번째 테마 transition 전환 비활성화
  const [themeType, setTheme] = useState<ThemeType>(() => manageTheme("get"));

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (isFirstTransition.current === false) {
        isFirstTransition.current = true;
      }

      return manageTheme("set", prevTheme === "light" ? "dark" : "light");
    });
  };

  return (
    <CustomThemeContext.Provider value={{ themeType, toggleTheme }}>
      <StyledThemeProvider theme={themeType === "light" ? lightTheme : darkTheme}>
        <GlobalStyle isThemeChanging={isFirstTransition.current} />
        {children}
      </StyledThemeProvider>
    </CustomThemeContext.Provider>
  );
};

/**
 * 테마 상태 유지 헬퍼함수
 */
const manageTheme = <T extends "set" | "get">(
  type: T,
  payload?: T extends "set" ? ThemeType : never
): ThemeType => {
  const key = "theme";
  const handler = {
    // payload가 존재할 경우만 로컬 스토리지에 저장
    set() {
      return payload ? (localStorage.setItem(key, payload), payload) : "light";
    },
    // 로컬 스토리지에서 테마 가져오기
    get() {
      return (localStorage.getItem(key) ?? "light") as ThemeType;
    },
  };

  return handler[type]();
};
