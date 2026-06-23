import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, PageHeader } from '@shared/components';
import { BookOpen } from '@shared/icons';
import LibraryTabs from '@features/study-material/components/LibraryTabs';
import LibraryItemCard from '@features/study-material/components/LibraryItemCard';
import LibraryEmptyState from '@features/study-material/components/LibraryEmptyState';
import LibraryPagination from '@features/study-material/components/LibraryPagination';
import { libraryTabs, useMyLibrary } from '../hooks/useStudyMaterial';
import SEO from '@shared/components/SEO';

const MyLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const library = useMyLibrary();

  return (
    <div className="space-y-6 animate-fade-in">
      <SEO title="My Library" noIndex />
      <PageHeader
        title="My Library"
        subtitle="Your saved, completed, and downloaded study materials"
        icon={<BookOpen className="w-7 h-7 text-tb-blue" />}
      />

      <LibraryTabs tabs={libraryTabs} activeTab={library.activeTab} onTabChange={library.setActiveTab} />

      {library.loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : library.libraryItems.length === 0 ? (
        <LibraryEmptyState activeTab={library.activeTab} onBrowse={() => navigate('/app/study-material')} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {library.libraryItems.map((item) => (
              <LibraryItemCard key={item.id} item={item} onRemoveBookmark={library.handleRemoveBookmark} />
            ))}
          </div>

          <LibraryPagination
            currentPage={library.libraryPagination.currentPage}
            totalPages={library.libraryPagination.totalPages}
            page={library.page}
            onPageChange={library.setPage}
          />
        </>
      )}
    </div>
  );
};

export default MyLibraryPage;
