import React from 'react';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onChange, error }) => {
  return (
    <div>
      <label className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <span>
          I agree to the{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</a>
        </span>
      </label>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default TermsCheckbox;
