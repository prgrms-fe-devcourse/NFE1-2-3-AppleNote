// ESLint에서 JavaScript 규칙을 가져옵니다.
import js from "@eslint/js";
// ESLint에서 브라우저 환경의 글로벌 객체를 설정하기 위해 사용합니다.
import globals from "globals";
// React의 Hook 사용 규칙을 제공하는 플러그인입니다.
import reactHooks from "eslint-plugin-react-hooks";
// React Refresh를 위한 ESLint 플러그인으로, 개발 환경에서 컴포넌트가 변경될 때 Hot Reload를 지원합니다.
import reactRefresh from "eslint-plugin-react-refresh";
// TypeScript와 ESLint를 통합하기 위한 설정과 규칙들을 제공합니다.
import tseslint from "typescript-eslint";
// Prettier와 ESLint를 통합하여 코드 스타일을 강제하는 플러그인입니다.
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

//"eslint-config-prettier"; // ESLint 규칙 중 Prettier가 처리하는 코드 스타일 관련 규칙들을 비활성화
//"eslint-plugin-prettier/recommended"; // 플러그인은 코드가 Prettier 규칙을 따르는지 ESLint가 검사

// ESLint 설정을 TypeScript용으로 구성합니다.
export default tseslint.config(
  // ESLint가 무시할 경로를 설정합니다. (예: 컴파일된 파일이 있는 dist 폴더)
  { ignores: ["dist"] },

  // 주요 ESLint 규칙을 확장하고 파일 및 플러그인을 설정합니다.
  {
    // JavaScript와 TypeScript 추천 규칙들을 확장합니다.
    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    // 검사할 파일 패턴을 설정합니다. 여기서는 모든 .ts, .tsx 파일을 대상으로 합니다.
    files: ["**/*.{ts,tsx}"],

    // 언어 환경 설정입니다.
    languageOptions: {
      // ECMAScript 2020 버전을 사용합니다.
      ecmaVersion: 2020,

      // 브라우저 환경의 전역 객체를 사용할 수 있게 설정합니다.
      globals: globals.browser,
    },

    // 사용할 플러그인을 정의합니다.
    plugins: {
      "react-hooks": reactHooks, // React Hooks 관련 규칙 사용
      "react-refresh": reactRefresh, // React Refresh 관련 규칙 사용
    },

    // 프로젝트에서 적용할 규칙들을 정의합니다.
    rules: {
      // React Hooks 추천 규칙을 가져와 적용합니다.
      ...reactHooks.configs.recommended.rules,

      // React Refresh: 컴포넌트는 기본적으로 export되어야 한다는 규칙입니다.
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // ===과 !==을 사용하도록 강제합니다. (==과 != 사용 금지)
      eqeqeq: "error",

      // console.log와 같은 콘솔 사용을 경고합니다.
      "no-console": "warn",

      // 특정 구문 사이에 공백 라인을 강제하는 규칙입니다.
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" }, // return문 전에 항상 공백 추가
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" }, // 변수 선언 후 공백 추가
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] }, // 연속된 변수 선언 사이에는 공백을 추가하지 않음
      ],

      // return 문 앞에 공백 줄을 강제합니다.
      "newline-before-return": "error",

      // 함수 선언 대신 함수 표현식을 사용하도록 강제합니다.
      "func-style": ["error", "expression"],
    },
  },

  // Prettier와 ESLint 추천 규칙을 함께 사용하도록 설정합니다.
  eslintPluginPrettierRecommended
);
