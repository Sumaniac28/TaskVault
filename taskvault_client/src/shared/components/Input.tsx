import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-1 sm:space-y-1.5">
      {label && (
        <label className="block text-xs sm:text-sm font-themeFont font-semibold text-primary">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background border border-border-default text-primary placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-bodyFont text-sm ${
          error ? "border-error" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-error text-xs font-bodyFont">{error}</p>}
    </div>
  );
}
