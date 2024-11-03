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
  logo: {
    primary: {
      background: string;
      text: string;
    };
    secondary: {
      background: string;
      text: string;
    };
  };
  button: {
    background: string;
    text: string;
  };
  boxShadow: {
    primary: string;
  };
  divider: {
    background: string;
  };
  footer: {
    background: string;
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
  logo: {
    primary: {
      background: "#000000",
      text: "#ffffff",
    },
    secondary: {
      background: "#ffffff",
      text: "#000000",
    },
  },
  button: {
    background: "#000000",
    text: "#ffffff",
  },
  boxShadow: {
    primary: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  divider: {
    background: "#000000",
  },
  footer: {
    background: "#333333",
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
  logo: {
    primary: {
      background: "#ffffff",
      text: "#000000",
    },
    secondary: {
      background: "#121212",
      text: "#ffffff",
    },
  },
  button: {
    background: "#ffffff",
    text: "#000000",
  },
  boxShadow: {
    primary: "0 4px 8px rgba(255, 255, 255, 0.2)",
  },
  divider: {
    background: "#ffffff",
  },
  footer: {
    background: "#000000",
  },
};
