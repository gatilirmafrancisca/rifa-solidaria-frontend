import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-verde text-white hover:bg-verde-escuro disabled:bg-carvao/20 disabled:text-carvao/40",
  secondary:
    "bg-white text-verde-escuro border border-verde hover:bg-verde/5",
  ghost: "bg-transparent text-verde-escuro underline hover:text-verde-escuro/70",
};

/**
 * Botão base do design system. Usar em vez de <button> cru sempre que
 * a ação for uma CTA visível — mantém consistência visual e evita
 * reimplementar estados de hover/disabled em cada feature.
 */
export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-full px-5 py-3 font-display text-sm font-bold transition active:scale-[0.98] disabled:cursor-not-allowed",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
