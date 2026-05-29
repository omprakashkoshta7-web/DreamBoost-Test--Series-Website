import React from 'react';
import { Bookmark } from '@shared/icons';
import { Card, Button } from '@shared/components';

interface BookmarkEmptyStateProps {
  onBrowse: () => void;
}

const BookmarkEmptyState: React.FC<BookmarkEmptyStateProps> = ({ onBrowse }) => {
  return (
    <Card>
      <div className="text-center py-12">
        <Bookmark className="w-16 h-16 text-tb-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-tb-navy mb-2">No bookmarks yet</h3>
        <p className="text-tb-gray-500 mb-6">Bookmark questions during your tests to review them later.</p>
        <Button variant="primary" onClick={onBrowse}>Browse Test Series</Button>
      </div>
    </Card>
  );
};

export default BookmarkEmptyState;
