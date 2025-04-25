import path from "path";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "Clinics Medical System",
        short_name: "Clinics Management",
        description: "This clinics medical system from egprog",
        theme_color: "#2a2a2a",
        background_color: "#2a2a2a",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("crypto-js")) return "chunk-cr";
            if (id.includes("react")) return "chunk-rc";
            if (id.includes("react-router-dom")) return "chunk-rt";
            if (id.includes("@reduxjs")) return "chunk-rx";
            if (id.includes("@tanstack")) return "chunk-qy";
            if (id.includes("@radix-ui")) return "chunk-rs";
            if (id.includes("framer-motion")) return "chunk-mt";
            if (id.includes("zod")) return "chunk-z";
            if (id.includes("axios")) return "chunk-ax";
            if (id.includes("sweetalert2")) return "chunk-alert";
            if (id.includes("clsx") || id.includes("class-variance-authority"))
              return "chunk-utils";
          }
        },
      },
    },
  },
});
