/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VALORACION_MANUAL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
