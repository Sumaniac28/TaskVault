import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="space-y-1 sm:space-y-1.5">
      {label && (
        <label className="block text-xs sm:text-sm font-themeFont font-semibold text-primary">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background border border-border-default text-primary placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none font-bodyFont text-sm ${
          error ? "border-error" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-error text-xs font-bodyFont">{error}</p>}
    </div>
  );
}
