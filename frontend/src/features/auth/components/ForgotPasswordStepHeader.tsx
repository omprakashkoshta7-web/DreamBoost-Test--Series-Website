import React from 'react';

interface ForgotPasswordStepHeaderProps {
  title: string;
  description: string;
}

const ForgotPasswordStepHeader: React.FC<ForgotPasswordStepHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default ForgotPasswordStepHeader;
