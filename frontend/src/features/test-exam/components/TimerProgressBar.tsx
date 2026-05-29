import React from 'react';

interface TimerProgressBarProps {
  timePercentage: number;
  timeLeft: number;
}

const TimerProgressBar: React.FC<TimerProgressBarProps> = ({ timePercentage, timeLeft }) => (
  <div className="h-1 bg-gray-200"><div className={`h-full transition-all duration-500 ${timeLeft < 300 ? 'bg-red-500' : 'bg-tb-blue'}`} style={{ width: `${timePercentage}%` }} /></div>
);

export default TimerProgressBar;
