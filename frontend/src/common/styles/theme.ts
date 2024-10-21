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
  buttonBgColor: "#d33131",
  buttonTextColor: "#E8EAF6",
};

export const darkTheme: DefaultTheme = {
  bgColor: "#060606",
  textColor: "#FFFFFF",
  buttonBgColor: "#2CCECE",
  buttonTextColor: "#ffffff",
};
