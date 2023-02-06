import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	build: {
		outDir: 'dist/static'
	},
	server: {
		host: true,
	},
	plugins: [
		react({
			babel: {
				plugins: [
					"babel-plugin-transform-typescript-metadata",
					["@babel/plugin-proposal-decorators", { legacy: true }],
					["@babel/plugin-proposal-class-properties", { loose: true }],
				],
				presets: ["@babel/preset-typescript"],
			},
		}),
	],
});
