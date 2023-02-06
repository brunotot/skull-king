/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_EASY_LOGIN: "true" | "false";
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
