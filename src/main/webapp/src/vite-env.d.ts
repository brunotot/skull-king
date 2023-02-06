/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_EASY_LOGIN: "true" | "false";
	readonly VITE_API_URI: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
