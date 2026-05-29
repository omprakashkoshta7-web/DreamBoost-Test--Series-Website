import React from 'react';
import { Card } from '@shared/components';

const DetailedInstructions: React.FC = () => {
  return (
    <Card title="Detailed Instructions">
      <div className="space-y-6 mt-4">
        {/* Navigating to a Question */}
        <div>
          <h3 className="text-sm font-bold text-tb-navy mb-3">Navigating to a Question:</h3>
          <ol className="space-y-2 text-sm text-tb-gray-700 ml-4 list-decimal">
            <li>
              <strong>Direct Navigation:</strong> Click on the question number in the Question Palette at the right to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.
            </li>
            <li>
              <strong>Save & Next:</strong> Click on <strong>Save & Next</strong> to save your answer for the current question and then go to the next question.
            </li>
            <li>
              <strong>Mark for Review & Next:</strong> Click on <strong>Mark for Review & Next</strong> to save your answer for the current question and also mark it for review, then go to the next question.
            </li>
          </ol>
          <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-tb-gray-700">
              <strong>Important:</strong> Your answer for the current question will not be saved if you navigate to another question directly by clicking on a question number without saving the answer to the previous question.
            </p>
          </div>
        </div>

        {/* Viewing Questions */}
        <div>
          <h3 className="text-sm font-bold text-tb-navy mb-3">Viewing All Questions:</h3>
          <p className="text-sm text-tb-gray-700 mb-2">
            You can view all the questions by clicking on the <strong>Question Paper</strong> button. <span className="text-tb-red font-semibold">This feature is provided so that if you want you can just see the entire question paper at a glance.</span>
          </p>
        </div>

        {/* Answering a Question - MCQ */}
        <div>
          <h3 className="text-sm font-bold text-tb-navy mb-3">Answering a Multiple Choice (MCQ) Question:</h3>
          <ol className="space-y-2 text-sm text-tb-gray-700 ml-4 list-decimal">
            <li>Choose one answer from the 4 options (A, B, C, D) given below the question, click on the bubble placed before the chosen option.</li>
            <li>To deselect your chosen answer, click on the bubble of the chosen option again or click on the <strong>Clear Response</strong> button.</li>
            <li>To change your chosen answer, click on the bubble of another option.</li>
            <li>To save your answer, you MUST click on the <strong>Save & Next</strong> button.</li>
          </ol>
        </div>

        {/* Answering a Question - Numerical */}
        <div>
          <h3 className="text-sm font-bold text-tb-navy mb-3">Answering a Numerical Answer Type Question:</h3>
          <ol className="space-y-2 text-sm text-tb-gray-700 ml-4 list-decimal">
            <li>To enter a number as your answer, use the virtual numerical keypad.</li>
            <li>
              A fraction (e.g. -0.3 or -.3) can be entered as an answer with or without "0" before the decimal point. 
              <span className="text-tb-red"> As many as four decimal points, e.g. 12.5435 or 0.003 or -932.6711 or 12.82 can be entered.</span>
            </li>
            <li>To clear your answer, click on the <strong>Clear Response</strong> button.</li>
            <li>To save your answer, you MUST click on the <strong>Save & Next</strong> button.</li>
          </ol>
        </div>

        {/* Marking for Review */}
        <div>
          <h3 className="text-sm font-bold text-tb-navy mb-3">Marking Questions for Review:</h3>
          <p className="text-sm text-tb-gray-700 mb-2">
            To mark a question for review, click on the <strong>Mark for Review & Next</strong> button. If an answer is selected (for MCQ/MCAQ) entered (for numerical answer type) for a question that is marked for review, that answer will be considered in the evaluation unless the status is modified by the candidate.
          </p>
        </div>

        {/* Important Notes */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-2">
          <p className="text-xs font-semibold text-tb-navy mb-2">Important Notes:</p>
          <ul className="space-y-2 text-xs text-tb-gray-700 ml-4 list-disc">
            <li>Sections in this question paper are displayed on the top bar of the screen. Questions in a Section can be viewed by clicking on the name of that Section.</li>
            <li>The Section you are currently viewing will be highlighted.</li>
            <li>After clicking the <strong>Save & Next</strong> button for the last question in a Section, you will automatically be taken to the first question of the next Section in sequence.</li>
            <li>You can move the mouse cursor over the name of a Section to view the answering status for that Section.</li>
            <li><strong>ONLY Questions for which answers are saved or marked for review after answering will be considered for evaluation.</strong></li>
            <li>To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default DetailedInstructions;
