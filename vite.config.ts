import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import visualizer from "rollup-plugin-visualizer";

//TODO: optimize the split chunk
//https://www.npmjs.com/package/rollup-plugin-visualizer
//https://dev.to/tassiofront/splitting-vendor-chunk-with-vite-and-loading-them-async-15o3
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({ include: "**/*.svg?react" }),
    splitVendorChunkPlugin(),
    visualizer(),
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // creating a chunk to react routes deps. Reducing the vendor chunk size
          // if (id.includes("react-dom")) {
          //   return "react-dom";
          // }
          //TODO: optimize the split chunk
          if (id.includes("recoil")) {
            return "recoil";
          }
          if (id.includes("regenerator-runtime")) {
            return "regenerator-runtime";
          }
        },
      },
    },
  },
});
