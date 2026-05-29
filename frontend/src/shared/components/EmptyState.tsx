import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, className = '' }) => (
  <div className={`flex flex-col items-center justify-center bg-white rounded-xl border border-tb-gray-100 p-12 text-center ${className}`}>
    {icon && <div className="mb-4">{icon}</div>}
    <h3 className="text-lg font-semibold text-tb-gray-600">{title}</h3>
    {description && <p className="mt-2 text-sm text-tb-gray-400">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;
