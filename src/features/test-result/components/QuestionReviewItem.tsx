import React from 'react';
import { Badge } from '@shared/components';
import { CheckCircle, XCircle, Clock } from '@shared/icons';

interface ExplanationData {
  text: string;
  steps: string[];
  formula: string;
}

interface QuestionReviewItemProps {
  q: { question: string; options: string[]; correct: number; explanation: string | ExplanationData; image?: string | null; attachmentType?: string; topic: string; subject?: string; difficulty: string; type?: string; section?: string };
  index: number;
  userAnswer: number | null;
  norm: (v: unknown) => string;
}

const QuestionReviewItem: React.FC<QuestionReviewItemProps> = ({ q, index, userAnswer, norm }) => {
  const isInteger = q.type === 'integer';
  const isCorrect = isInteger ? norm(userAnswer) === norm(q.correct) : userAnswer === q.correct;
  const isSkipped = userAnswer === undefined || userAnswer === null;
  return (
    <div className={`border rounded-xl overflow-hidden ${isSkipped ? 'border-amber-200' : isCorrect ? 'border-green-200' : 'border-red-200'}`}>
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isSkipped ? 'bg-amber-100 text-amber-600' : isCorrect ? 'bg-green-100 text-tb-green' : 'bg-red-100 text-tb-red'}`}>
            {isSkipped ? <Clock className="w-4 h-4" /> : isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-tb-navy">Q{index + 1}: {q.question}</p>
            <p className="text-xs text-tb-gray-500 mt-0.5">
              {isSkipped ? 'Skipped' : isCorrect ? 'Correct' : `Your answer: ${isInteger ? userAnswer : (q.options[userAnswer as number] || userAnswer)}`}
              {!isCorrect && !isSkipped && isInteger && ` | Correct answer: ${q.correct}`}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">{q.subject && !/^[a-f\d]{24}$/i.test(String(q.subject).trim()) && <Badge variant="secondary">{q.subject}</Badge>}{q.topic && !/^[a-f\d]{24}$/i.test(String(q.topic).trim()) && <Badge variant="primary">{q.topic}</Badge>}<Badge variant={q.difficulty === 'easy' ? 'success' : q.difficulty === 'medium' ? 'warning' : 'danger'}>{q.difficulty}</Badge></div>
        {q.image && (
          <div className="overflow-hidden rounded-lg border border-tb-gray-200 bg-white">
            <img src={q.image} alt="Question attachment" className="max-h-60 w-full object-contain" />
          </div>
        )}
        <div className="space-y-1.5">
          {isInteger && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-tb-gray-50 border border-tb-gray-200">
              <span className="text-xs font-semibold text-tb-gray-500">Your answer:</span>
              <span className={`text-lg font-bold ${isCorrect ? 'text-tb-green' : 'text-tb-red'}`}>{userAnswer}</span>
              {!isCorrect && (
                <><span className="text-tb-gray-400 mx-1">|</span><span className="text-xs font-semibold text-tb-gray-500">Correct:</span><span className="text-lg font-bold text-tb-green">{q.correct}</span></>
              )}
            </div>
          )}
          {!isInteger && q.options.map((opt: string, oi: number) => {
            const isUser = norm(userAnswer) === norm(oi);
            const isCorr = norm(q.correct) === norm(oi);
            return (
              <div key={oi} className={`flex items-center gap-2 p-2.5 rounded-lg text-sm ${isCorr ? 'bg-green-100 text-green-800 border border-green-300' : isUser && !isCorr ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-tb-gray-50 text-tb-gray-600 border border-tb-gray-200'}`}>
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold border">{String.fromCharCode(65 + oi)}</span>
                <span className="flex-1">{opt}</span>
                {isCorr && <CheckCircle className="w-4 h-4 text-tb-green" />}
                {isUser && !isCorr && <XCircle className="w-4 h-4 text-tb-red" />}
              </div>
            );
          })}
        </div>
        {q.explanation && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-tb-blue mb-1">Explanation</p>
            {typeof q.explanation === 'string' ? (
              <p className="text-sm text-blue-800">{q.explanation}</p>
            ) : (
              <div className="space-y-2 text-sm text-blue-800">
                {q.explanation.text && <p>{q.explanation.text}</p>}
                {q.explanation.steps?.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-tb-blue">Steps:</p>
                    <ol className="list-decimal list-inside space-y-0.5">
                      {q.explanation.steps.map((step, si) => (
                        <li key={si}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
                {q.explanation.formula && (
                  <div className="mt-1 p-2 bg-blue-100/60 rounded font-mono text-xs">{q.explanation.formula}</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionReviewItem;
