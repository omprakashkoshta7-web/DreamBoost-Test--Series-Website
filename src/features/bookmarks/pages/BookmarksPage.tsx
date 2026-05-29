import React, { useEffect } from 'react';
import { Loader, Button, Card, Badge } from '@shared/components';
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '../hooks';
import BackToDashboardButton from '@features/bookmarks/components/BackToDashboardButton';
import BookmarkHeader from '@features/bookmarks/components/BookmarkHeader';
import BookmarkEmptyState from '@features/bookmarks/components/BookmarkEmptyState';
import BookmarkQuestionCard from '@features/bookmarks/components/BookmarkQuestionCard';

const BookmarksPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookmarks, loading, refresh, toggleBookmark } = useBookmarks();

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleUnbookmark = (id: string) => {
    toggleBookmark(id);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader size="lg" label="Loading bookmarks..." /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <BackToDashboardButton />

      <BookmarkHeader count={bookmarks.length} />

      {bookmarks.length === 0 ? (
        <BookmarkEmptyState onBrowse={() => navigate('/app/test-series')} />
      ) : (
        <div className="space-y-3">
          {bookmarks.map((q: any, idx: number) => (
            <BookmarkQuestionCard key={q._id || idx} q={q} idx={idx} onUnbookmark={handleUnbookmark} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
