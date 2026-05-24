interface CardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-surface-text-container rounded-[24px] shadow-soft ${className}`}>
    {children}
  </div>
);

export default Card;
