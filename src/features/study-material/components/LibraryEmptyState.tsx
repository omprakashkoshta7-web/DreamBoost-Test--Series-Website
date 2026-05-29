import React from 'react';
import { BookOpen } from '@shared/icons';
import { Button } from '@shared/components';

interface LibraryEmptyStateProps {
  activeTab: string;
  onBrowse: () => void;
}

const LibraryEmptyState: React.FC<LibraryEmptyStateProps> = ({ activeTab, onBrowse }) => {
  return (
    <div className="bg-white rounded-xl border border-tb-gray-100 p-12 text-center">
      <BookOpen className="w-16 h-16 text-tb-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-tb-navy mb-1">Nothing here yet</h3>
      <p className="text-sm text-tb-gray-500 mb-4">
        {activeTab === 'all' && 'Start exploring study materials and save them to your library'}
        {activeTab === 'bookmarked' && 'Bookmark materials to find them quickly'}
        {activeTab === 'completed' && 'Complete materials to track your progress'}
        {activeTab === 'downloaded' && 'Download materials for offline access'}
        {activeTab === 'history' && 'Your recently accessed materials will appear here'}
      </p>
      <Button onClick={onBrowse}>Browse Materials</Button>
    </div>
  );
};

export default LibraryEmptyState;
