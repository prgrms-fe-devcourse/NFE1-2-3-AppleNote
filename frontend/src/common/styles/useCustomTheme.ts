import { useContext } from "react";

import { CustomThemeContext } from "./ThemeProvider";

const useCustomTheme = () => {
  const context = useContext(CustomThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default useCustomTheme;
