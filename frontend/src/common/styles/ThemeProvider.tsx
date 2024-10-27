import { createContext, PropsWithChildren, useRef, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { darkTheme, lightTheme } from "@common/styles/theme.ts";
import { GlobalStyle } from "./GlobalStyle";
import { localStorageHelper } from "@common/utils/localStorageHelper";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  themeType: ThemeType;
  toggleTheme: () => void;
}

export const CustomThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const CustomThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const localStorage = localStorageHelper<ThemeType>("theme", "light");
  const isFirstTransition = useRef(false); // 첫 번째 테마 transition 전환 비활성화
  const [themeType, setTheme] = useState<ThemeType>(() => localStorage.get());

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (isFirstTransition.current === false) {
        isFirstTransition.current = true;
      }

      return localStorage.set(prevTheme === "light" ? "dark" : "light");
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
