import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/components';
import { Home, ArrowLeft, AlertTriangle } from '@shared/icons';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-9xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            404
          </div>
          <div className="absolute -top-4 -right-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="primary" onClick={() => navigate('/')}>
            <Home className="w-4 h-4" /> Go Home
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" /> Go Back
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Or try these pages</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Dashboard', path: '/app/dashboard' },
              { label: 'Test Series', path: '/app/test-series' },
              { label: 'Leaderboard', path: '/app/leaderboard' },
              { label: 'Profile', path: '/app/profile' },
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
