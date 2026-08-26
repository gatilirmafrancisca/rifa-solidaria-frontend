import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Injeta o header que evita a tela de aviso do ngrok — reaproveitado
// nos dois prefixos de proxy, pra não duplicar a mesma configuração.
function skipNgrokWarning(proxy: any) {
  proxy.on("proxyReq", (proxyReq: any) => {
    proxyReq.setHeader("ngrok-skip-browser-warning", "true");
  });
}

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), "");
  const backendTunnelUrl = env.BACKEND_TUNNEL_URL;

  if (!backendTunnelUrl) {
    throw new Error("BACKEND_TUNNEL_URL não definida no .env do frontend.");
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5173,

      allowedHosts: [".trycloudflare.com"],
      proxy: {
        "/api": {
          target: backendTunnelUrl,
          changeOrigin: true,
          configure: skipNgrokWarning,
        },
        "/mercadopago": {
          target: backendTunnelUrl,
          changeOrigin: true,
          configure: skipNgrokWarning,
        },
      },
    },
  };
});