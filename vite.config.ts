import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";

//TODO: optimize the split chunk
//https://www.npmjs.com/package/rollup-plugin-visualizer
//https://dev.to/tassiofront/splitting-vendor-chunk-with-vite-and-loading-them-async-15o3
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({ include: "**/*.svg?react" }),
    splitVendorChunkPlugin(),
  ],
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
  optimizeDeps: { include: ["react", "react-dom", "react-router-dom"] },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id: string) {
  //         // creating a chunk to @open-ish deps. Reducing the vendor chunk size
  //         if (id.includes("@open-ish") || id.includes("tslib")) {
  //           return "@open-ish";
  //         }
  //         // creating a chunk to react routes deps. Reducing the vendor chunk size
  //         if (
  //           id.includes("react-router-dom") ||
  //           id.includes("@remix-run") ||
  //           id.includes("react-router")
  //         ) {
  //           return "@react-router";
  //         }
  //       },
  //     },
  //   },
  // },
});
