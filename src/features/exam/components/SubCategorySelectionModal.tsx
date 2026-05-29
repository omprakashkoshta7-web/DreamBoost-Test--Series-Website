import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, BookOpen, FileText, GraduationCap, ChevronRight } from '@shared/icons';

interface SubCategorySelectionModalProps {
  examName: string;
  subCategories: string[];
  onSelect: (subCategory: string) => void;
  onClose: () => void;
}

const icons = [BookOpen, FileText, GraduationCap];

const SubCategorySelectionModal: React.FC<SubCategorySelectionModalProps> = ({ examName, subCategories, onSelect, onClose }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setAnimate(true));
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`} />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md transition-all duration-300 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-2xl rounded-2xl border border-white/20 dark:border-gray-700/40 shadow-2xl shadow-black/10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-tb-blue via-blue-400 to-purple-400" />
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-tb-gray-100/80 dark:border-gray-700/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tb-blue to-blue-600 flex items-center justify-center text-white shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-tb-navy dark:text-white">Select Exam</h2>
                <p className="text-xs text-tb-gray-500">Choose an exam type under {examName}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-tb-gray-400 hover:text-tb-gray-600 dark:hover:text-gray-300 hover:bg-tb-gray-100 dark:hover:bg-gray-700/60 transition-all duration-200">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 py-5 space-y-3">
            {subCategories.map((sc, i) => {
              const IconComp = icons[i % icons.length];
              return (
                <button
                  key={i}
                  onClick={() => onSelect(sc)}
                  className="group w-full flex items-center gap-4 p-4 text-left rounded-xl border border-tb-gray-200/70 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:bg-tb-blue-light dark:hover:bg-blue-900/20 hover:border-tb-blue/40 dark:hover:border-blue-500/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-tb-blue to-blue-600 flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-tb-navy dark:text-gray-100">{examName} {sc}</span>
                    <span className="block text-xs text-tb-gray-500 mt-0.5">Practice tests for {examName} {sc}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-tb-gray-400 group-hover:text-tb-blue group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined') return createPortal(modal, document.body);
  return modal;
};

export default SubCategorySelectionModal;
