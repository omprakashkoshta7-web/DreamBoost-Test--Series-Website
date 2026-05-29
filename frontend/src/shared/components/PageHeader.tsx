import React from 'react';
import { ArrowLeft } from '@shared/icons';
import Button from './Button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onBack?: () => void;
  backLabel?: string;
  action?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title, subtitle, icon, onBack, backLabel, action, className = ''
}) => (
  <div className={`mb-6 ${className}`}>
    {onBack && (
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-3">
        <ArrowLeft className="w-4 h-4 mr-1" />
        {backLabel || 'Back'}
      </Button>
    )}
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-tb-navy">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-tb-gray-500">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  </div>
);

export default PageHeader;
