import React from 'react';
import { PageHeader, Badge } from '@shared/components';
import { Bookmark } from '@shared/icons';

interface BookmarkHeaderProps {
  count: number;
}

const BookmarkHeader: React.FC<BookmarkHeaderProps> = ({ count }) => (
  <PageHeader
    title="Bookmarked Questions"
    icon={<Bookmark className="w-6 h-6 text-tb-blue" />}
    action={<Badge variant="primary">{count} saved</Badge>}
  />
);

export default BookmarkHeader;
