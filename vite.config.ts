import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Configuração do Vite. O alias "@" aponta para "src", para evitar
// imports relativos longos (../../../components/...) conforme o
// projeto cresce.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
});
