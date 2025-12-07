interface BadgeProps {
  variant?: "primary" | "success" | "warning" | "error" | "info";
  children: string;
}

export default function Badge({ variant = "primary", children }: BadgeProps) {
  const styles = {
    primary: "bg-primary/20 text-primary",
    success: "bg-green-100 text-green-900",
    warning: "bg-yellow-100 text-yellow-900",
    error: "bg-error/20 text-error",
    info: "bg-blue-100 text-blue-900",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold font-bodyFont ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
