import React from 'react';
import { Badge } from '@shared/components';

interface OverviewTabProps {
  material: any;
}

const isBinaryPdfContent = (content?: string) => {
  if (!content) return false;
  const sample = content.slice(0, 1200);
  const replacementCount = (sample.match(/\uFFFD/g) || []).length;
  return sample.startsWith('%PDF') || sample.includes('/Type /Page') || replacementCount > 20;
};

const OverviewTab: React.FC<OverviewTabProps> = ({ material }) => {
  const safeContent = isBinaryPdfContent(material.content) ? '' : material.content;

  return (
    <div className="bg-white rounded-2xl border border-tb-gray-100 p-6 space-y-6">
    <div className="grid grid-cols-2 gap-4">
      {[
        { label: 'Category', value: material.category },
        { label: 'Duration', value: `${material.duration} minutes` },
        { label: 'Author', value: material.author || 'N/A' },
        { label: 'Chapter', value: material.chapter || 'General' },
      ].map((item) => (
        <div key={item.label} className="p-4 bg-tb-gray-50 rounded-xl">
          <p className="text-xs text-tb-gray-400 uppercase tracking-wider">{item.label}</p>
          <p className="font-semibold text-tb-navy mt-1 capitalize">{item.value}</p>
        </div>
      ))}
    </div>
    {material.tags?.length > 0 && (
      <div>
        <p className="text-xs text-tb-gray-400 uppercase tracking-wider mb-2">Tags</p>
        <div className="flex gap-2 flex-wrap">
          {material.tags.map((tag: string, i: number) => (
            <Badge key={i} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>
    )}
    {safeContent && (
      <div>
        <p className="text-xs text-tb-gray-400 uppercase tracking-wider mb-2">Description</p>
        <div className="text-sm text-tb-gray-600 leading-relaxed whitespace-pre-wrap">{safeContent}</div>
      </div>
    )}
    </div>
  );
};

export default OverviewTab;
