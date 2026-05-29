import React from 'react';
import { Card } from '@shared/components';

const QuestionPaletteInstructions: React.FC = () => {
  return (
    <Card title="Question Palette Status Guide">
      <div className="space-y-4 mt-4">
        <p className="text-sm text-tb-gray-600">
          The Question Palette on the right side of the screen shows the status of each question using the following symbols:
        </p>
        
        <div className="space-y-3">
          {/* Not Visited */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 border-2 border-tb-gray-400 rounded-sm" />
            </div>
            <div>
              <p className="text-sm font-semibold text-tb-navy">Not Visited</p>
              <p className="text-sm text-tb-gray-600">You have not visited the question yet.</p>
            </div>
          </div>

          {/* Not Answered */}
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-tb-red" />
            </div>
            <div>
              <p className="text-sm font-semibold text-tb-navy">Not Answered</p>
              <p className="text-sm text-tb-gray-600">You have visited the question but not answered it.</p>
            </div>
          </div>

          {/* Answered */}
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-tb-green" />
            </div>
            <div>
              <p className="text-sm font-semibold text-tb-navy">Answered</p>
              <p className="text-sm text-tb-gray-600">You have answered the question.</p>
            </div>
          </div>

          {/* Marked for Review (Not Answered) */}
          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-purple-500 relative">
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-tb-navy">Marked for Review (Not Answered)</p>
              <p className="text-sm text-tb-gray-600">You have NOT answered the question, but have marked it for review.</p>
            </div>
          </div>

          {/* Marked for Review (Answered) */}
          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-purple-500 relative border-2 border-purple-600">
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-tb-navy">Marked for Review (Answered)</p>
              <p className="text-sm text-tb-gray-600">You have answered the question and marked it for review.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-tb-navy">
            <strong>Note:</strong> The "Mark for Review" status simply indicates that you would like to look at that question again. If a question is answered and marked for review, the answer will be considered for evaluation unless the status is modified by you.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default QuestionPaletteInstructions;
