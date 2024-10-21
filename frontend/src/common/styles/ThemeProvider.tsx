import { createContext, PropsWithChildren, useState } from "react";
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
  const [themeType, setTheme] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <CustomThemeContext.Provider value={{ themeType, toggleTheme }}>
      <StyledThemeProvider theme={themeType === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </CustomThemeContext.Provider>
  );
};
