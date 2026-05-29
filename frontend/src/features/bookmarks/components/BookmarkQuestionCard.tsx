import React from 'react';
import { Card, Badge } from '@shared/components';
import { Trash2 } from '@shared/icons';

interface BookmarkQuestionCardProps {
  q: any;
  idx: number;
  onUnbookmark: (id: string) => void;
}

const BookmarkQuestionCard: React.FC<BookmarkQuestionCardProps> = ({ q, idx, onUnbookmark }) => {
  const qData = q.questionId || q;
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-tb-gray-500">Q{idx + 1}</span>
            {qData.topic && !/^[a-f\d]{24}$/i.test(String(qData.topic).trim()) && <Badge variant="primary">{qData.topic}</Badge>}
            {qData.difficulty && (
              <Badge variant={qData.difficulty === 'easy' ? 'success' : qData.difficulty === 'medium' ? 'warning' : 'danger'}>
                {qData.difficulty}
              </Badge>
            )}
          </div>
          <p className="text-sm font-medium text-tb-navy mb-3">{qData.question}</p>
          <div className="space-y-1.5">
            {qData.options?.map((opt: string, oi: number) => (
              <div key={oi} className="flex items-center gap-2 text-sm text-tb-gray-500">
                <span className="w-5 h-5 rounded-full bg-tb-gray-100 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {String.fromCharCode(65 + oi)}
                </span>
                <span>{opt}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => onUnbookmark(q._id || qData._id)}
          className="p-2 rounded-lg text-tb-red hover:bg-red-50 transition-colors flex-shrink-0"
          title="Remove bookmark"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
};

export default BookmarkQuestionCard;
