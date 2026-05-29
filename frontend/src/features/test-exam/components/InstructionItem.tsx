import React from 'react';

interface InstructionItemProps {
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  title: string;
  children: React.ReactNode;
}

const InstructionItem: React.FC<InstructionItemProps> = ({ icon, bgColor, iconColor, title, children }) => (
  <div className={`flex items-start gap-3 p-3 ${bgColor} rounded-lg`}>
    <div className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`}>{icon}</div>
    <div className="text-sm text-tb-gray-700">
      <p className="font-semibold text-tb-navy mb-1">{title}</p>
      <p>{children}</p>
    </div>
  </div>
);

export default InstructionItem;
