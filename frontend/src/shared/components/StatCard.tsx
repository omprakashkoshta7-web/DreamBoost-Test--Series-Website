import React from 'react';

interface StatCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon, label, value, className = '', labelClassName = '', valueClassName = ''
}) => (
  <div className={`flex items-center gap-3 bg-white rounded-xl border border-tb-gray-100 p-4 ${className}`}>
    {icon}
    <div>
      <p className={`text-xs font-medium text-tb-gray-500 ${labelClassName}`}>{label}</p>
      <p className={`text-xl font-bold text-tb-navy ${valueClassName}`}>{value}</p>
    </div>
  </div>
);

export default StatCard;
