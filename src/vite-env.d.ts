/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_GITHUB_PAT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
