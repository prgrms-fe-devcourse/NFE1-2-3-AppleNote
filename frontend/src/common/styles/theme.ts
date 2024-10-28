import "styled-components";
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends CustomTheme {}
}

interface CustomTheme {
  background: {
    primary: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
    warning: string;
  };
  button: {
    background: string;
    text: string;
  };
}

export const lightTheme: DefaultTheme = {
  background: {
    primary: "#ffffff",
    secondary: "#f8f8f8",
  },
  text: {
    primary: "#000000",
    secondary: "#1C1C1C",
    warning: "#D32F2F",
  },
  button: {
    background: "#000000",
    text: "#ffffff",
  },
};

export const darkTheme: DefaultTheme = {
  background: {
    primary: "#121212",
    secondary: "#1E1E1E",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#E0E0E0",
    warning: "#FF6659",
  },
  button: {
    background: "#ffffff",
    text: "#000000",
  },
};
