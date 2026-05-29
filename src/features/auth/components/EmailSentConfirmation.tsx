import React from 'react';
import { CheckCircle } from '@shared/icons';

interface EmailSentConfirmationProps {
  maskedEmail: string;
}

const EmailSentConfirmation: React.FC<EmailSentConfirmationProps> = ({ maskedEmail }) => {
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Check your email</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        We've sent a 6-digit code to <span className="font-semibold text-gray-900 dark:text-white">{maskedEmail}</span>
      </p>
    </div>
  );
};

export default EmailSentConfirmation;
