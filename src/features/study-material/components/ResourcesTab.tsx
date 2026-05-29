import React from 'react';
import { FileText, Download, Sparkles } from '@shared/icons';

interface ResourcesTabProps {
  material: any;
  onDownloadPdf: () => void;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ material, onDownloadPdf }) => (
  <div className="bg-white rounded-2xl border border-tb-gray-100 p-6 space-y-4">
    <h3 className="font-semibold text-tb-navy">Attachments & Resources</h3>
    {material.pdfUrl ? (
      <button type="button" onClick={onDownloadPdf}
        className="w-full flex items-center gap-3 p-4 bg-tb-gray-50 rounded-xl hover:bg-tb-blue-light/30 transition-all group text-left">
        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center"><FileText className="w-5 h-5 text-red-500" /></div>
        <div className="flex-1">
          <p className="text-sm font-medium text-tb-navy group-hover:text-tb-blue transition-colors">Download PDF</p>
          <p className="text-xs text-tb-gray-400">Click to view download options</p>
        </div>
        <Download className="w-5 h-5 text-tb-gray-400 group-hover:text-tb-blue" />
      </button>
    ) : (
      <p className="text-sm text-tb-gray-400 text-center py-8">No additional resources available.</p>
    )}
    <div className="pt-4 border-t border-tb-gray-100">
      <h4 className="text-sm font-semibold text-tb-navy mb-3">Related Materials</h4>
      <div className="flex items-center gap-2 text-sm text-tb-gray-400"><Sparkles className="w-4 h-4 text-tb-orange" />More materials coming soon</div>
    </div>
  </div>
);

export default ResourcesTab;
