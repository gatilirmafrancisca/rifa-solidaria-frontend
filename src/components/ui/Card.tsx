import type { HTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl bg-white p-5 shadow-[0_6px_18px_rgba(26,83,49,0.10)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
