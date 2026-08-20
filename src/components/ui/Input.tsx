import { forwardRef, type InputHTMLAttributes } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/**
 * Input de formulário com label e mensagem de erro embutidas, para não
 * duplicar essa marcação em cada campo (ver ParticipantForm).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="mb-3">
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-bold text-verde-escuro"
        >
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={clsx(
            "w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition",
            "focus:border-verde",
            error ? "border-red-400" : "border-carvao/15",
            className
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
