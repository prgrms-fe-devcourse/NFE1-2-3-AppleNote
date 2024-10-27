import "styled-components";
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends CustomTheme {}
}

interface CustomTheme {
  bgColor: string;
  textColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
}

export const lightTheme: DefaultTheme = {
  bgColor: "#ffffff",
  textColor: "#000000",
  buttonBgColor: "#000000",
  buttonTextColor: "#ffffff",
};

export const darkTheme: DefaultTheme = {
  bgColor: "#000000",
  textColor: "#FFFFFF",
  buttonBgColor: "#ffffff",
  buttonTextColor: "#000000",
};
