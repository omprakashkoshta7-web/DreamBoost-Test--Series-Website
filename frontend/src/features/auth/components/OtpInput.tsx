import React, { useRef } from 'react';

interface OtpInputProps {
  otp: string[];
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent) => void;
  onPaste: (e: React.ClipboardEvent) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

const OtpInput: React.FC<OtpInputProps> = ({ otp, onChange, onKeyDown, onPaste, inputRefs }) => {
  return (
    <div className="flex justify-center gap-2 sm:gap-3" onPaste={onPaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => onChange(index, e.target.value)}
          onKeyDown={(e) => onKeyDown(index, e)}
          className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-tb-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
        />
      ))}
    </div>
  );
};

export default OtpInput;
