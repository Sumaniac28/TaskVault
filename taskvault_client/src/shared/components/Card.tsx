interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-surface p-3 sm:p-5 rounded-xl shadow border border-border-default hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </div>
  );
}
