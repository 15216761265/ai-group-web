import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ include: "**/*.svg?react" })],
  server: {
    host: "::",
    port: 4173,
  },
  resolve: {
    alias: {
      "@pages": "/src/pages",
      "@recoil": "/src/recoil",
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@typings": "/src/typings",
      "@apis": "/src/apis",
      "@modals": "/src/modals",
      "@utils": "/src/utils",
    },
  },
});
