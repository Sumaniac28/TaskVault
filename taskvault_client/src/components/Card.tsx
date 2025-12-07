interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-surface p-6 rounded-lg shadow border border-border-default ${className}`}>
      {children}
    </div>
  );
}
