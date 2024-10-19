import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginObject from "eslint-plugin-prefer-arrow";

//"eslint-config-prettier"; // ESLint 규칙 중 Prettier가 처리하는 코드 스타일 관련 규칙들을 비활성화
//"eslint-plugin-prettier/recommended"; // 플러그인은 코드가 Prettier 규칙을 따르는지 ESLint가 검사

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "prefer-arrow": pluginObject,
    },
    rules: {
      eqeqeq: "error",
      "no-console": "warn",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" }, // return문 전에 공백
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" }, // 변수 선언 후 공백
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] }, // 연속 변수 선언 시 공백 없음
      ],
      "newline-before-return": "error",
      "func-style": ["error", "expression"], // 함수 선언 대신 함수 표현식 사용
      "prefer-arrow/prefer-arrow-functions": [
        "error",
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
    },
  },

  eslintPluginPrettierRecommended,
];
