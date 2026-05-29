import React from 'react';
import { Card } from '@shared/components';
import { CheckCircle, XCircle, Clock } from '@shared/icons';

interface MarkingSchemeGridProps {
  negativeMarks: string | number;
  correctMarks: number;
}

const MarkingSchemeGrid: React.FC<MarkingSchemeGridProps> = ({ negativeMarks, correctMarks }) => (
  <Card title="Marking Scheme">
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className="p-4 bg-green-50 rounded-xl text-center border border-green-200"><CheckCircle className="w-8 h-8 text-tb-green mx-auto mb-2" /><p className="text-2xl font-bold text-tb-green">+{correctMarks}</p><p className="text-sm text-tb-gray-600">Correct</p></div>
      <div className="p-4 bg-red-50 rounded-xl text-center border border-red-200"><XCircle className="w-8 h-8 text-tb-red mx-auto mb-2" /><p className="text-2xl font-bold text-tb-red">{negativeMarks}</p><p className="text-sm text-tb-gray-600">Wrong</p></div>
      <div className="p-4 bg-gray-50 rounded-xl text-center border border-gray-200"><Clock className="w-8 h-8 text-tb-gray-400 mx-auto mb-2" /><p className="text-2xl font-bold text-tb-gray-500">0</p><p className="text-sm text-tb-gray-600">Skipped</p></div>
    </div>
  </Card>
);

export default MarkingSchemeGrid;
