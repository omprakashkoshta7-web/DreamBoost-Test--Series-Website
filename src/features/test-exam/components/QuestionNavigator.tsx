import React from 'react';

interface Section {
  name: string;
  questions: any[];
}

interface QuestionNavigatorProps {
  totalQuestions: number;
  answers: Record<string, number>;
  flagged: Set<number>;
  currentQuestion: number;
  onNavigate: (index: number) => void;
  getQuestionStatus: (i: number) => string;
  statusColors: Record<string, string>;
  sections: Section[];
  activeSectionIdx: number;
  onSectionChange: (sectionIdx: number) => void;
}

const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({ totalQuestions, answers, flagged, currentQuestion, onNavigate, getQuestionStatus, statusColors, sections, activeSectionIdx, onSectionChange }) => {
  const safeSections = Array.isArray(sections) ? sections : [];
  const activeSection = safeSections[activeSectionIdx] || safeSections[0];
  const activeQuestions = activeSection && Array.isArray(activeSection.questions) ? activeSection.questions : [];
  let sectionStart = 0;
  for (let i = 0; i < activeSectionIdx && i < safeSections.length; i++) {
    sectionStart += Array.isArray(safeSections[i].questions) ? safeSections[i].questions.length : 0;
  }

  return (
    <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-tb-gray-200 bg-white p-4 overflow-y-auto">
      <h4 className="font-semibold text-tb-navy mb-3">Question Navigator</h4>
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg"><div className="w-3 h-3 rounded-full bg-green-500" /><span className="text-tb-gray-700">Answered: {Object.keys(answers).length}</span></div>
        <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg"><div className="w-3 h-3 rounded-full bg-amber-500" /><span className="text-tb-gray-700">Flagged: {flagged.size}</span></div>
        <div className="flex items-center gap-2 p-2 bg-tb-gray-50 rounded-lg col-span-2"><div className="w-3 h-3 rounded-full bg-gray-300" /><span className="text-tb-gray-700">Remaining: {totalQuestions - Object.keys(answers).length}</span></div>
      </div>
      {safeSections.length > 1 && (
        <div className="flex flex-wrap gap-1 mb-3 border-b border-tb-gray-200 pb-2">
          {safeSections.map((section, idx) => (
            <button key={section.name} onClick={() => onSectionChange(idx)} className={`px-2 py-1 text-[10px] font-semibold rounded transition-colors ${idx === activeSectionIdx ? 'bg-tb-blue text-white' : 'bg-tb-gray-100 text-tb-gray-600 hover:bg-tb-gray-200'}`}>
              {section.name}
            </button>
          ))}
        </div>
      )}
      {activeSection && (
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-xs font-bold text-tb-navy truncate">{activeSection.name}</h5>
          <span className="text-[10px] text-tb-gray-500">{activeQuestions.filter((q: any) => answers[q._id] !== undefined).length}/{activeQuestions.length}</span>
        </div>
      )}
      <div className="grid grid-cols-5 gap-1.5">
        {activeQuestions.map((_q: any, i: number) => {
          const flatIndex = sectionStart + i;
          return (
            <button key={flatIndex} onClick={() => onNavigate(flatIndex)} className={`w-full aspect-square rounded-lg text-xs font-bold transition-all ${statusColors[getQuestionStatus(flatIndex)]}`}>
              {flatIndex + 1}
            </button>
          );
        })}
      </div>
      {activeQuestions.length === 0 && (
        <div className="text-center text-sm text-tb-gray-500 py-8">No questions in this section</div>
      )}
    </div>
  );
};

export default QuestionNavigator;
