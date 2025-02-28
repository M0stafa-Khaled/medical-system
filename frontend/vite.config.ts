import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
  },
  server: {
    proxy: {
      "/api": {
        target: "https://egprog.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            if (
              !req.headers.referer ||
              !req.headers.referer.includes("http://localhost:5173")
            )
              proxyReq.destroy();
          });
        },
      },
    },
  },
});
