import React, { useState, useEffect } from 'react';
import { Button } from '@shared/components';
import { Trash2 } from '@shared/icons';

interface VirtualKeypadProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

const VirtualKeypad: React.FC<VirtualKeypadProps> = ({ value, onChange }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(value !== undefined ? String(value) : '');
  }, [value]);

  const handleDigit = (digit: string) => {
    if (input === '0' && digit !== '.') {
      setInput(digit);
    } else {
      setInput(prev => prev + digit);
    }
  };

  const handleSubmit = () => {
    const num = parseInt(input, 10);
    if (!isNaN(num)) onChange(num);
  };

  const handleClear = () => {
    setInput('');
    onChange(undefined);
  };

  const handleBackspace = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['-', '0', '⌫'],
  ];

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="mb-3 rounded-xl border-2 border-tb-gray-200 bg-white px-4 py-3 text-center">
        <span className={`text-2xl font-bold font-mono ${input ? 'text-tb-navy' : 'text-tb-gray-400'}`}>
          {input || '______'}
        </span>
      </div>
      <div className="space-y-2">
        {keys.map((row, ri) => (
          <div key={ri} className="flex gap-2">
            {row.map((key) => {
              if (key === '⌫') {
                return (
                  <button key={key} onClick={handleBackspace} className="flex-1 h-12 rounded-xl border border-tb-gray-200 bg-white text-sm font-bold text-tb-gray-600 hover:bg-tb-gray-50 active:bg-tb-gray-100 transition-colors">
                    ⌫
                  </button>
                );
              }
              if (key === '-') {
                return (
                  <button key={key} onClick={() => setInput(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev)} className="flex-1 h-12 rounded-xl border border-tb-gray-200 bg-white text-sm font-bold text-tb-gray-600 hover:bg-tb-gray-50 active:bg-tb-gray-100 transition-colors">
                    +/-
                  </button>
                );
              }
              return (
                <button key={key} onClick={() => handleDigit(key)} className="flex-1 h-12 rounded-xl border border-tb-gray-200 bg-white text-lg font-bold text-tb-navy hover:bg-tb-gray-50 active:bg-tb-gray-100 transition-colors">
                  {key}
                </button>
              );
            })}
          </div>
        ))}
        <div className="flex gap-2 pt-1">
          <button onClick={handleClear} className="flex items-center justify-center gap-1.5 flex-1 h-11 rounded-xl border border-red-200 bg-red-50 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors">
            <Trash2 className="w-4 h-4" /> Clear
          </button>
          <button onClick={handleSubmit} className="flex-1 h-11 rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-700 transition-colors">
            Save Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualKeypad;
