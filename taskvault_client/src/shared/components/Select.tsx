import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export default function Select({
  label,
  error,
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1 sm:space-y-1.5">
      {label && (
        <label className="block text-xs sm:text-sm font-themeFont font-semibold text-primary">
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-background border border-border-default text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-bodyFont text-sm ${
          error ? "border-error" : ""
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-error text-xs font-bodyFont">{error}</p>}
    </div>
  );
}
