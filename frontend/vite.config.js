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
				target: "http://localhost:8000",
			},
		},
	},
});
