/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ORDER_ID_PARAM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
