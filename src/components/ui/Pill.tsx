import type { ReactNode } from "react";
import { clsx } from "clsx";

interface PillProps {
  children: ReactNode;
  tone?: "neutral" | "laranja";
}

export function Pill({ children, tone = "neutral" }: PillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold",
        tone === "laranja"
          ? "border-[#ffdba7] bg-[#fff1de] text-[#a85e00]"
          : "border-carvao/10 bg-white text-verde-escuro"
      )}
    >
      {children}
    </span>
  );
}
