import React from 'react';
import { BookOpen } from '@shared/icons';

const HeroSection: React.FC = () => {
  return (
    <div className="py-2 sm:py-3">
      <span className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-tb-blue-light text-tb-blue border border-tb-blue/15 mb-3">
        <BookOpen className="w-3.5 h-3.5" /> Practice Zone
      </span>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-tb-navy tracking-tight">Test Series</h1>
      <p className="mt-2 text-sm sm:text-base text-tb-gray-500 max-w-xl">
        Explore full-length mocks and chapter-wise tests to improve speed, accuracy, and confidence.
      </p>
    </div>
  );
};

export default HeroSection;
