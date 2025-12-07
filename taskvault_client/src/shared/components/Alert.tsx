import { ReactNode } from "react";

interface AlertProps {
  type: "error" | "success" | "warning" | "info";
  message: string;
  onClose?: () => void;
  icon?: ReactNode;
}

export default function Alert({ type, message, onClose, icon }: AlertProps) {
  const styles = {
    error: "bg-error/10 border-error text-error",
    success: "bg-green-100 border-green-500 text-green-900",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-900",
    info: "bg-blue-100 border-blue-500 text-blue-900",
  };

  return (
    <div
      className={`border rounded-lg px-3 sm:px-4 py-2 sm:py-3 font-bodyFont flex items-center justify-between gap-2 sm:gap-3 ${styles[type]}`}
    >
      <div className="flex items-center gap-1 sm:gap-2 min-w-0">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <p className="text-xs sm:text-sm break-words">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-base sm:text-lg font-bold opacity-70 hover:opacity-100 flex-shrink-0"
        >
          ×
        </button>
      )}
    </div>
  );
}
