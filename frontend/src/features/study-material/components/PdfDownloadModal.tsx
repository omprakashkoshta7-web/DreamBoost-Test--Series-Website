import React from 'react';
import { Modal } from '@shared/components';
import { Download, Eye } from '@shared/icons';

interface PdfDownloadModalProps {
  isOpen: boolean;
  material: any;
  onClose: () => void;
}

export const PdfDownloadModal = ({ isOpen, material, onClose }: PdfDownloadModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="PDF Download" size="lg">
    <div className="space-y-5">
      <div className="flex items-start gap-4 rounded-2xl bg-tb-gray-50 p-4">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <p className="font-semibold text-tb-navy">{material.title}</p>
          <p className="text-sm text-tb-gray-500 mt-1">PDF material is ready. Open it in a new tab or download it to your device.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a href={material.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-tb-gray-200 px-4 py-3 text-sm font-semibold text-tb-navy hover:bg-tb-gray-50 transition-all">
          <Eye className="w-4 h-4" /> Open PDF
        </a>
        <a href={material.pdfUrl} download className="inline-flex items-center justify-center gap-2 rounded-xl bg-tb-blue px-4 py-3 text-sm font-semibold text-white hover:bg-tb-blue-dark transition-all">
          <Download className="w-4 h-4" /> Download PDF
        </a>
      </div>
    </div>
  </Modal>
);

export default PdfDownloadModal;
