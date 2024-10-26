import "styled-components";
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends CustomTheme {}
}

interface CustomTheme {
  background: string;
  textPrimary: string;
  textSecondary: string;
}

export const lightTheme: DefaultTheme = {
  background: "#ffffff",
  textPrimary: "#000000",
  textSecondary: "#1C1C1C",
};

export const darkTheme: DefaultTheme = {
  background: "#121212",
  textPrimary: "##FFFFFF",
  textSecondary: "#E0E0E0",
};
