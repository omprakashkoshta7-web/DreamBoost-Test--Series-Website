import React from 'react';
import { Button } from '@shared/components';
import { FileText, Video, Play, CheckCircle, ChevronLeft, ChevronRight, Download, Eye } from '@shared/icons';

interface ContentTabProps {
  material: any;
  markedComplete: boolean;
  onMarkComplete: () => void;
  onDownloadPdf?: () => void;
}

const isBinaryPdfContent = (content?: string) => {
  if (!content) return false;
  const sample = content.slice(0, 1200);
  const replacementCount = (sample.match(/\uFFFD/g) || []).length;
  return sample.startsWith('%PDF') || sample.includes('/Type /Page') || replacementCount > 20;
};

const ContentTab: React.FC<ContentTabProps> = ({ material, markedComplete, onMarkComplete, onDownloadPdf }) => {
  const shouldShowPdf = Boolean(material.pdfUrl) && (material.category === 'pdf' || isBinaryPdfContent(material.content));
  const safeContent = isBinaryPdfContent(material.content) ? '' : material.content;

  return (
    <div className="bg-white rounded-2xl border border-tb-gray-100 p-6 space-y-4">
      {shouldShowPdf ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-tb-navy">PDF Material</p>
                <p className="text-xs text-tb-gray-400">Read the uploaded PDF below</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={material.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-tb-blue text-white text-sm font-semibold hover:bg-tb-blue-dark transition-all">
                <Eye className="w-4 h-4" /> Open
              </a>
              <Button variant="secondary" size="sm" type="button" onClick={onDownloadPdf}><Download className="w-4 h-4" /> Download</Button>
            </div>
          </div>
          <iframe
            title={material.title}
            src={material.pdfUrl}
            className="w-full h-[72vh] rounded-xl border border-tb-gray-200 bg-tb-gray-50"
          />
        </div>
      ) : safeContent ? (
        <div className="prose prose-sm max-w-none">
          <div className="text-sm text-tb-gray-600 leading-relaxed whitespace-pre-wrap">{safeContent}</div>
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-tb-gray-300 mx-auto mb-3" />
          <p className="text-tb-gray-500 text-sm">No content available for this material.</p>
        </div>
      )}

    {material.videoUrl && (
      <div className="mt-6">
        <p className="text-sm font-semibold text-tb-navy mb-3 flex items-center gap-2"><Video className="w-4 h-4 text-tb-blue" /> Video Resource</p>
        <div className="aspect-video bg-tb-gray-100 rounded-xl flex items-center justify-center">
          <a href={material.videoUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-tb-blue text-white rounded-xl hover:bg-tb-blue-dark transition-all">
            <Play className="w-5 h-5" /> Watch Video
          </a>
        </div>
      </div>
    )}

      <div className="flex items-center justify-between pt-6 border-t border-tb-gray-100">
        <Button variant="ghost" size="sm"><ChevronLeft className="w-4 h-4" /> Previous</Button>
        <Button onClick={onMarkComplete} size="sm"><CheckCircle className="w-4 h-4" />{markedComplete ? 'Completed' : 'Mark Complete'}</Button>
        <Button variant="ghost" size="sm">Next <ChevronRight className="w-4 h-4" /></Button>
      </div>
    </div>
  );
};

export default ContentTab;
