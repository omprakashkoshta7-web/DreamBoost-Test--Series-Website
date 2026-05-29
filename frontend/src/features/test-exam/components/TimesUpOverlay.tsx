import React from 'react';
import { Button } from '@shared/components';
import { ChevronLeft, ChevronRight, Flag, AlertCircle, CheckCircle } from '@shared/icons';
import { formatMathText, isMongoIdText } from '../utils/formatMathText';

interface Section {
  name: string;
  questions: any[];
}

interface TimesUpOverlayProps {
  question: any;
  answers: Record<string, number>;
  flagged: Set<number>;
  currentQuestion: number;
  totalQuestions: number;
  navigateQuestion: (d: number) => void;
  displayText: (value: unknown) => string;
  currentSection: Section | null;
  currentQInSection: number;
}

const getQuestionText = (question: any, displayText: (value: unknown) => string) =>
  formatMathText(displayText(question?.question ?? question?.text ?? question?.title ?? ''));

const getOptions = (question: any) => Array.isArray(question?.options) ? question.options : [];

const mathTokenPattern = /(\$[^$]+\$|\\\([^)]+\\\)|(?:[A-Za-z]*[xyabmn][A-Za-z]*[⁰¹²³⁴⁵⁶⁷⁸⁹]?)|[+\-=<>≤≥√∫πθλμ²³⁴⁵⁶⁷⁸⁹⁰|()]+|\d+\/\d+)/g;

const MathText: React.FC<{ value: string; className?: string }> = ({ value, className = '' }) => {
  const text = formatMathText(value);
  if (!text) return null;
  const parts = text.split(mathTokenPattern).filter((part) => part !== '');
  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isWrappedMath = (part.startsWith('$') && part.endsWith('$')) || (part.startsWith('\\(') && part.endsWith('\\)'));
        const cleaned = isWrappedMath ? part.replace(/^\$|\$$/g, '').replace(/^\\\(|\\\)$/g, '') : part;
        const isMath = isWrappedMath || /[+\-=<>≤≥√∫πθλμ²³⁴⁵⁶⁷⁸⁹⁰|()]|[xyabmn]/i.test(part);
        return <React.Fragment key={`${part}-${index}`}>{isMath ? <span className="font-serif italic tracking-normal text-slate-900">{cleaned}</span> : cleaned}</React.Fragment>;
      })}
    </span>
  );
};

const TimesUpOverlay: React.FC<TimesUpOverlayProps> = ({ question, answers, flagged, currentQuestion, totalQuestions, navigateQuestion, displayText, currentSection, currentQInSection }) => {
  const questionText = getQuestionText(question, displayText);
  const options = getOptions(question);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div><h3 className="font-bold text-red-700">Time's Up!</h3><p className="text-sm text-red-600">Your answers have been saved. Please submit your test.</p></div>
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            {currentSection && <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">{currentSection.name} \u2022 Q{currentQInSection + 1}</span>}
            {!currentSection && <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full">Question {currentQuestion + 1}</span>}
            {question?.subject && !isMongoIdText(question.subject) && <span className="px-3 py-1 bg-tb-gray-100 text-tb-gray-600 text-xs font-semibold rounded-full">{displayText(question.subject)}</span>}
            {flagged.has(currentQuestion) && <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1"><Flag className="w-3 h-3" /> Flagged</span>}
          </div>
          <h3 className="whitespace-pre-line break-words text-lg sm:text-xl font-semibold text-tb-navy leading-relaxed">
            <MathText value={questionText || 'Question text unavailable'} />
          </h3>
          {question?.topic && !isMongoIdText(question.topic) && <p className="mt-2 text-sm text-tb-gray-500">{displayText(question.topic)}</p>}
          {(question?.image || question?.attachmentUrl) && (
            (question?.attachmentType === 'image' || question?.image) ? (
              <div className="mt-4">
                <img src={question.image || question.attachmentUrl} alt="Question attachment" className="max-h-80 w-full object-contain" />
              </div>
            ) : (
              <div className="mt-4 overflow-hidden rounded-xl border border-tb-gray-200 bg-white">
                <div className="bg-tb-gray-50">
                  <div className="flex items-center justify-between gap-3 border-b border-tb-gray-200 px-4 py-3">
                    <span className="text-sm font-semibold text-tb-navy">Attached PDF</span>
                    <a href={question.attachmentUrl} target="_blank" rel="noreferrer" className="rounded-lg bg-tb-blue px-3 py-1.5 text-xs font-bold text-white">
                      Open PDF
                    </a>
                  </div>
                  <object data={question.attachmentUrl} type="application/pdf" className="h-96 w-full">
                    <div className="p-4 text-sm text-tb-gray-600">PDF preview is not available. Use Open PDF.</div>
                  </object>
                </div>
              </div>
            )
          )}
        </div>
        <div className="space-y-3 mb-8">
          {question?.type === 'integer' ? (
            <div className="rounded-xl border-2 border-tb-gray-200 bg-gray-50 p-4 text-center">
              <p className="text-xs font-semibold text-tb-gray-500 mb-2">Your Answer</p>
              <span className="text-3xl font-bold font-mono text-tb-navy">{typeof answers[question._id] === 'number' ? answers[question._id] : '—'}</span>
            </div>
          ) : options.length > 0 ? options.map((opt: unknown, idx: number) => {
            const isSelected = answers[question._id] === idx;
            return (
              <div key={idx} className={`w-full text-left p-4 rounded-xl border-2 cursor-default ${isSelected ? 'border-tb-blue bg-blue-50 shadow-md' : 'border-tb-gray-200 bg-gray-50'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${isSelected ? 'bg-tb-blue text-white' : 'bg-tb-gray-100 text-tb-gray-600'}`}>{String.fromCharCode(65 + idx)}</div>
                  <MathText value={formatMathText(displayText(opt)) || `Option ${String.fromCharCode(65 + idx)}`} className={`min-w-0 whitespace-pre-line break-words font-medium leading-relaxed ${isSelected ? 'text-tb-blue' : 'text-tb-gray-700'}`} />
                  {isSelected && <CheckCircle className="w-5 h-5 text-tb-blue ml-auto flex-shrink-0" />}
                </div>
              </div>
            );
          }) : (
            <div className="rounded-xl border border-dashed border-tb-gray-300 bg-tb-gray-50 p-4 text-sm text-tb-gray-500">No options available for this question.</div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Button variant="secondary" onClick={() => navigateQuestion(-1)} disabled={currentQuestion === 0}><ChevronLeft className="w-4 h-4" /> Previous</Button>
          <Button variant="primary" onClick={() => navigateQuestion(1)} disabled={currentQuestion === totalQuestions - 1}>Next <ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  );
};

export default TimesUpOverlay;
