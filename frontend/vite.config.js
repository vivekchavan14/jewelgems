import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: 'esnext',  // Set to 'esnext' to support top-level await
	  },
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://82.112.231.201:5000",
			},
		},
	},
});
