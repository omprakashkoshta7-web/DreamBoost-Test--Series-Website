import React from 'react';
import { createPortal } from 'react-dom';
import BrandLogo from '@shared/components/BrandLogo';
import { X } from '@shared/icons';

interface AuthModalShellProps {
  isVisible: boolean;
  onClose: () => void;
  showSidebar: boolean;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

const AuthModalShell: React.FC<AuthModalShellProps> = ({ isVisible, onClose, showSidebar, sidebar, children }) =>
  createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4 overflow-y-auto">
      <div
        className={`absolute inset-0 bg-gradient-to-br from-tb-navy/80 via-blue-900/80 to-indigo-900/80 backdrop-blur-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`relative my-auto w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 md:max-w-[640px] lg:max-w-[680px] ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm transition-all duration-200"
        >
          <X className="w-5 h-5 text-tb-gray-500" />
        </button>
        {showSidebar ? (
          <div className="flex max-h-[92vh] flex-col md:h-[720px] md:max-h-[88vh] md:flex-row">
            {sidebar}
            <div className="min-w-0 flex-1 overflow-y-auto p-5 sm:p-6 md:p-8">
              <BrandLogo className="md:hidden flex items-center gap-1.5 mb-6" logoClassName="h-12 w-16" textClassName="text-lg font-bold bg-gradient-to-r from-tb-blue to-blue-700 bg-clip-text text-transparent" />
              {children}
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>,
    document.body
  );

export default AuthModalShell;
