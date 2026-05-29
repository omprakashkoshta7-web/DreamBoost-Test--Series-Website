import React from 'react';
import { ChevronDown, LogOut } from '@shared/icons';

interface UserDropdownLink {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface UserDropdownProps {
  user: { name?: string; email?: string } | null;
  userInitials: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onLogout: () => void;
  navigate: (href: string) => void;
  links: UserDropdownLink[];
  variant?: 'default' | 'landing';
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  user, userInitials, isOpen, onToggle, onClose, onLogout, navigate, links, variant = 'default'
}) => {
  const isLanding = variant === 'landing';

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 p-1.5 transition-all duration-200 ${
          isLanding ? 'rounded-xl hover:bg-tb-gray-100' : 'rounded-md hover:bg-tb-gray-100'
        }`}
      >
        <div className={`w-8 h-8 flex items-center justify-center text-white text-xs font-bold ${
          isLanding
            ? 'bg-gradient-to-br from-tb-blue to-indigo-500 rounded-lg shadow-md shadow-blue-500/25'
            : 'bg-tb-blue rounded-full'
        }`}>
          {userInitials}
        </div>
        <span className="hidden sm:block text-sm font-medium text-tb-navy max-w-24 truncate">
          {user?.name || 'User'}
        </span>
        <ChevronDown className={`w-4 h-4 text-tb-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div className={`absolute right-0 mt-2 w-56 bg-white border border-tb-gray-200/50 py-1 z-50 animate-slide-up overflow-hidden ${
            isLanding ? 'rounded-xl shadow-xl' : 'rounded-lg shadow-tb-lg'
          }`}>
            <div className={`px-4 py-3 border-b border-tb-gray-100 ${isLanding ? 'bg-tb-gray-50/50' : ''}`}>
              <p className="text-sm font-semibold text-tb-navy">{user?.name || 'User'}</p>
              <p className="text-xs text-tb-gray-500 truncate">{user?.email || ''}</p>
            </div>
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.href}
                  onClick={() => { navigate(link.href); onClose(); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-tb-gray-600 hover:bg-tb-gray-50 hover:text-tb-navy transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </button>
              );
            })}
            <div className="border-t border-tb-gray-100 mt-1 pt-1">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-tb-red hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDropdown;
