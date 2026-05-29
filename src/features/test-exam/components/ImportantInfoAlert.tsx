import React from 'react';
import { Card } from '@shared/components';
import { AlertTriangle } from '@shared/icons';

interface ImportantInfoAlertProps {
  passingMarks: number;
  totalMarks: number;
  duration: number;
  negativeMarksText: string;
}

const ImportantInfoAlert: React.FC<ImportantInfoAlertProps> = ({ passingMarks, totalMarks, duration, negativeMarksText }) => (
  <Card>
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-800">Important</h4>
          <ul className="text-sm text-amber-700 mt-2 space-y-1 list-disc list-inside">
            <li>Passing marks: <strong>{passingMarks}/{totalMarks}</strong></li>
            <li>Total time: <strong>{duration} minutes</strong></li>
            <li>{negativeMarksText}</li>
            <li>Results displayed immediately after submission</li>
            <li>Review all questions with solutions after submission</li>
            <li>Rank updated on leaderboard</li>
          </ul>
        </div>
      </div>
    </div>
  </Card>
);

export default ImportantInfoAlert;
