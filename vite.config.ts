import path from "path";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
// import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   includeAssets: ["favicon.svg", "robots.txt"],
    //   manifest: {
    //     name: "Clinics Medical System",
    //     short_name: "Clinics Medical System",
    //     description: "This clinics medical system from egprog",
    //     theme_color: "#2a2a2a",
    //     background_color: "#2a2a2a",
    //     display: "standalone",
    //     start_url: "/",
    //     icons: [
    //       {
    //         src: "icons/icon-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "icons/icon-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //     ],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react-helmet-async": path.resolve(
        __dirname,
        "./src/shared/lib/helmetShim.tsx"
      ),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/") ||
              id.includes("node_modules/react-router")
            ) {
              return "react";
            }
            if (
              id.includes("node_modules/@radix-ui") ||
              id.includes("node_modules/class-variance-authority") ||
              id.includes("node_modules/clsx") ||
              id.includes("node_modules/tailwind-merge")
            ) {
              return "ui";
            }
            if (id.includes("node_modules/framer-motion")) {
              return "framer";
            }
            if (id.includes("node_modules/lucide-react")) {
              return "lucide";
            }
            if (id.includes("node_modules/react-redux")) {
              return "react-redux";
            }
            if (id.includes("node_modules/zod")) {
              return "zod";
            }
          }
        },
      },
    },
  },
});
