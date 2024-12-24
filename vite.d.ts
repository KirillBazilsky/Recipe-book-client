interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_BASE_IMG_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
