import React from 'react';
import { GraduationCap } from '@shared/icons';

const examOptions = [
  'SSC CGL', 'SSC CHSL', 'Banking PO', 'Banking Clerk', 'Railway NTPC',
  'UPSC Prelims', 'JEE Main', 'JEE Advanced', 'NEET', 'GATE',
  'CAT', 'Class 10', 'Class 12', 'Other',
];

interface ExamSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const ExamSelect: React.FC<ExamSelectProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-tb-gray-700 mb-1.5 flex items-center gap-1.5">
        <GraduationCap className="w-4 h-4" />
        Target Exam <span className="text-tb-red">*</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2.5 border rounded-md text-sm text-tb-navy focus:outline-none focus:ring-2 focus:ring-tb-blue focus:border-transparent bg-white ${
          error ? 'border-red-300' : 'border-tb-gray-300'
        }`}
      >
        <option value="">Select your target exam</option>
        {examOptions.map((exam) => (
          <option key={exam} value={exam}>{exam}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default ExamSelect;
