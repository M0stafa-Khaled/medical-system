/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENCRYPT_SECRET_KEY: string;
  readonly VITE_ENV: string;
  readonly VITE_WEB_NAME: string;
  readonly VITE_PUSHER_APP_KEY: string;
  readonly VITE_PUSHER_PORT: string;
  readonly VITE_PUSHER_SCHEME: string;
  readonly VITE_SLUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
