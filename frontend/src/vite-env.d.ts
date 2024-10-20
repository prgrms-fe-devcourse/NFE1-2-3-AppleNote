/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_MSW_ENABLED: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
