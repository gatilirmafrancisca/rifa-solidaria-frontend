import type { Config } from "tailwindcss";

// Paleta e tipografia derivadas do Mini Guia de Marca do Gatil.
// Sempre usar essas classes (bg-verde, text-laranja, font-display...)
// em vez de hexadecimais soltos no meio dos componentes.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        verde: {
          DEFAULT: "#368c5e",
          escuro: "#1a5331",
        },
        laranja: "#ff9d3b",
        creme: "#fffccc",
        carvao: "#1e1b1c",
        neutro: "#f7f7f7",
      },
      fontFamily: {
        display: ["Quicksand", "sans-serif"],
        body: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
