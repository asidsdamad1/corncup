interface PageHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between mb-stack-lg">
    <div>
      <h1 className="font-headline text-headline-lg text-ink-primary leading-tight">{title}</h1>
      {subtitle && (
        <p className="text-body-md text-on-surface-variant mt-1">{subtitle}</p>
      )}
    </div>
    {action && <div className="flex-shrink-0 ml-4">{action}</div>}
  </div>
);

export default PageHeader;
