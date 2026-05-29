import React, { useState } from 'react';
import { Bookmark } from '@shared/icons';
import apiClient from '@shared/utils/apiClient';

interface BookmarkButtonProps {
  questionId: string;
  isBookmarked?: boolean;
  onToggle?: (bookmarked: boolean) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ questionId, isBookmarked = false, onToggle }) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (bookmarked) {
        await apiClient.delete(`/bookmarks/${questionId}`);
        setBookmarked(false);
        onToggle?.(false);
      } else {
        await apiClient.post('/bookmarks', { questionId });
        setBookmarked(true);
        onToggle?.(true);
      }
    } catch {
      setBookmarked(bookmarked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
        bookmarked
          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          : 'bg-tb-gray-100 text-tb-gray-600 hover:bg-tb-gray-200'
      }`}
      title={bookmarked ? 'Remove bookmark' : 'Bookmark this question'}
    >
      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
      {bookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
};

export default BookmarkButton;
