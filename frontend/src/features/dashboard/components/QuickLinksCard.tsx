import React from 'react';

interface QuickLink {
  label: string;
  onClick: () => void;
}

interface QuickLinksCardProps {
  links: QuickLink[];
}

const QuickLinksCard: React.FC<QuickLinksCardProps> = ({ links }) => {
  return (
    <div className="bg-white rounded-xl border border-tb-gray-200 p-4">
      <h3 className="text-sm font-bold text-tb-navy mb-3">Quick Links</h3>
      <div className="space-y-2">
        {links.map((link, i) => (
          <button key={i} onClick={link.onClick}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-tb-gray-600 hover:bg-tb-gray-50 hover:text-tb-navy transition-colors">
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinksCard;
