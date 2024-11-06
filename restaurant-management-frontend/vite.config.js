import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import { esbuildCommonjs, viteCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all"), viteCommonjs()],
  build: {
    // outDir: '/var/www/html/admin/',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    force: true,
    exclude: ["react-editor-js"],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
      plugins: [
        esbuildCommonjs([
          "react-editor-js",
          "@react-editor-js/client",
          "@react-editor-js/server",
        ]),
      ],
    },
  },
});
