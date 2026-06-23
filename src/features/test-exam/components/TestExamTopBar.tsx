import React from 'react';
import { Button } from '@shared/components';
import { ArrowLeft, CheckCircle, Maximize, Timer, Clock, Eye, Send } from '@shared/icons';

interface Section {
  name: string;
  questions: any[];
}

interface TestExamTopBarProps {
  testName: string;
  currentQuestion: number;
  totalQuestions: number;
  savedLabel: string;
  isFullscreen: boolean;
  timeColor: string;
  formatTime: (s: number) => string;
  timeLeft: number;
  isPaused: boolean;
  onExit: () => void;
  onTogglePause: () => void;
  onSubmit: () => void;
  onRequestFullscreen: () => void;
  sections: Section[];
  currentSection: Section | null;
  currentQInSection: number;
  onSectionChange: (sectionIdx: number) => void;
}

const TestExamTopBar: React.FC<TestExamTopBarProps> = ({
  testName, currentQuestion, totalQuestions, savedLabel, isFullscreen, timeColor, formatTime, timeLeft, isPaused, onExit, onTogglePause, onSubmit, onRequestFullscreen,
  sections, currentSection, currentQInSection, onSectionChange,
}) => (
  <div className="flex flex-col border-b border-tb-gray-200 bg-white">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3">
      <div className="flex items-center gap-3">
        <button onClick={onExit} className="p-2 rounded-lg hover:bg-tb-gray-100"><ArrowLeft className="w-5 h-5 text-tb-gray-600" /></button>
        <div><h2 className="font-semibold text-tb-navy">{testName}</h2><p className="text-xs text-tb-gray-500">Q {currentQuestion + 1} of {totalQuestions}{currentSection ? ` \u2022 ${currentSection.name}` : ''}</p></div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-semibold">
          <CheckCircle className="w-3.5 h-3.5" />
          {savedLabel}
        </div>
        {!isFullscreen && (
          <button onClick={onRequestFullscreen} className="p-2.5 rounded-lg hover:bg-tb-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center" title="Fullscreen">
            <Maximize className="w-4 h-4 text-tb-gray-600" />
          </button>
        )}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${timeLeft < 300 ? 'bg-red-100' : 'bg-tb-gray-100'}`}>
          <Timer className={`w-4 h-4 ${timeColor}`} /><span className={`font-mono font-bold text-sm ${timeColor}`}>{formatTime(timeLeft)}</span>
        </div>
        <button onClick={onTogglePause} className="p-2.5 rounded-lg hover:bg-tb-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center">{isPaused ? <Eye className="w-5 h-5 text-tb-gray-600" /> : <Clock className="w-5 h-5 text-tb-gray-600" />}</button>
        <Button variant="primary" size="sm" onClick={onSubmit} className="min-h-[44px]"><Send className="w-4 h-4" /><span className="hidden sm:inline">Submit</span></Button>
      </div>
    </div>
    {sections.length > 1 && (
      <div className="flex gap-1 px-4 pb-3 overflow-x-auto">
        {sections.map((section, idx) => (
          <button key={section.name} onClick={() => onSectionChange(idx)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${idx === sections.indexOf(currentSection || sections[0]) ? 'bg-tb-blue text-white' : 'bg-tb-gray-100 text-tb-gray-600 hover:bg-tb-gray-200'}`}>
            {section.name}
            <span className="ml-1 text-[10px] opacity-70">({section.questions.length})</span>
          </button>
        ))}
      </div>
    )}
  </div>
);

export default TestExamTopBar;
