import React from 'react';
import { Button } from '@shared/components';
import { ChevronLeft, ChevronRight } from '@shared/icons';

interface LibraryPaginationProps {
  currentPage: number;
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

const LibraryPagination: React.FC<LibraryPaginationProps> = ({ currentPage, totalPages, page, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between pt-2">
      <p className="text-sm text-tb-gray-500">Page {currentPage} of {totalPages}</p>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => onPageChange(Math.max(1, page - 1))}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(Math.min(totalPages, page + 1))}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default LibraryPagination;
