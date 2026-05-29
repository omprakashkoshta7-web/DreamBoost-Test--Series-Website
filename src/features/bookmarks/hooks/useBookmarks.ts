import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectBookmarkQuestions, selectBookmarkLoading, selectBookmarkError } from '../store/bookmarks.selectors';
import { fetchBookmarks, addBookmark, removeBookmark } from '../store/bookmarks.slice';

export const useBookmarks = () => {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector(selectBookmarkQuestions);
  const loading = useAppSelector(selectBookmarkLoading);
  const error = useAppSelector(selectBookmarkError);

  const refresh = useCallback(() => dispatch(fetchBookmarks()), [dispatch]);

  const toggleBookmark = useCallback(
    (questionId: string) => {
      const bookmarked = bookmarks.some(
        (q) => q._id === questionId || q.questionId?._id === questionId
      );
      return dispatch(bookmarked ? removeBookmark(questionId) : addBookmark(questionId));
    },
    [dispatch, bookmarks]
  );

  const isBookmarked = useCallback(
    (questionId: string) => bookmarks.some(
      (q) => q._id === questionId || q.questionId?._id === questionId
    ),
    [bookmarks]
  );

  return { bookmarks, loading, error, toggleBookmark, isBookmarked, refresh };
};
