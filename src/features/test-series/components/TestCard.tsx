import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/components';
import { AlertTriangle, Clock, HelpCircle, Users } from '@shared/icons';
import { useTestCard } from '../hooks';

interface TestCardProps {
  test: any;
  completedCategories?: string[];
  isEnrolled?: boolean;
  currentTime?: number;
  onEnroll?: (test: any) => void;
  primaryLabel?: string;
  onPrimaryClick?: (test: any) => void;
}

const badgeColorMap: Record<string, string> = {
  red: '#ef4444', orange: '#f97316', amber: '#f59e0b', green: '#22c55e',
  emerald: '#10b981', blue: '#3b82f6', indigo: '#6366f1', purple: '#a855f7',
  pink: '#ec4899', rose: '#f43f5e',
};

const TestCard: React.FC<TestCardProps> = ({ test, completedCategories = [], isEnrolled = false, currentTime = 0, onEnroll, primaryLabel, onPrimaryClick }) => {
  const navigate = useNavigate();
  const isPremium = test.isPremium;
  const showBuySeries = isPremium && completedCategories.includes(test.category);
  const hasBadge = test.badge?.text;
  const discount = isPremium && test.originalPrice > test.price
    ? Math.round((1 - test.price / test.originalPrice) * 100)
    : 0;
  const quesCount = Math.max(0, Number(test.questionCount ?? test.totalQuestions ?? 0));
  const { g, Icon, isEndingSoon, endingCountdown } = useTestCard(test.category, test.activeUntil, currentTime);

  const handleClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick(test);
      return;
    }
    if (isEnrolled) {
      navigate(`/app/test-instructions/${test._id}`);
    } else if (showBuySeries || isPremium) {
      navigate('/app/payment');
    } else {
      onEnroll?.(test);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPrimaryClick) {
      onPrimaryClick(test);
      return;
    }
    if (isEnrolled) {
      navigate(`/app/test-instructions/${test._id}`);
    } else if (!isPremium) {
      onEnroll?.(test);
    } else {
      handleClick();
    }
  };

  return (
    <div onClick={handleClick} className="group cursor-pointer">
      <div className="relative h-full rounded-xl border border-orange-200 bg-white shadow-tb hover:shadow-tb-lg transition-all duration-300 overflow-hidden hover:-translate-y-0.5">
        <div className="absolute left-0 top-0 z-10">
          <div className="relative px-4 py-1.5 text-[11px] font-black uppercase tracking-wide text-white"
            style={{ backgroundColor: hasBadge ? (badgeColorMap[test.badge.color] || '#ef4444') : '#f97316' }}>
            {hasBadge ? test.badge.text : (showBuySeries ? 'Series' : isPremium ? 'Premium' : 'Popular')}
            <span className="absolute right-[-14px] top-0 h-full w-4"
              style={{ backgroundColor: hasBadge ? (badgeColorMap[test.badge.color] || '#ef4444') : '#f97316', clipPath: 'polygon(0 0,100% 0,0 100%)' }} />
          </div>
        </div>

        <div className="flex h-full flex-col p-4">
          <div className="relative mt-5 overflow-hidden rounded-lg bg-sky-100 px-5 py-8 text-center">
            <div className="absolute right-[-20px] top-[-20px] h-24 w-24 rounded-full bg-white/20" />
            <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${g.from} ${g.to} shadow-md shadow-blue-500/15`}>
              <Icon className="h-7 w-7 text-white" />
            </div>
            <p className="text-xl font-black uppercase tracking-wide text-blue-900 line-clamp-2">{test.category || 'Test Series'}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-blue-700">Complete Practice Set</p>
          </div>

          <div className="flex flex-1 flex-col px-1 pt-4">
            <h3 className="text-lg font-bold text-tb-navy group-hover:text-tb-blue transition-colors line-clamp-2">{test.name}</h3>
            <p className="text-sm text-tb-gray-500 mt-1.5 line-clamp-2 leading-relaxed min-h-[2.5rem]">
              {test.description || 'Practice questions for exam preparation'}
            </p>

            <div className="mt-5 space-y-3 text-sm text-tb-gray-600">
              {isEndingSoon && (
                <div className="flex items-center justify-between gap-3 py-2 text-red-700">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-black uppercase tracking-wide">Ending soon</p>
                    <p className="text-xs font-semibold text-red-700">Complete before it expires.</p>
                  </div>
                  <span className="font-mono text-lg font-black tabular-nums text-red-700">
                    {endingCountdown}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-tb-gray-400" />
                <span className="line-clamp-1">{test.subject || test.category || 'General'}</span>
              </div>
              <div className="flex items-center gap-3">
                <HelpCircle className="h-4 w-4 text-tb-gray-400" />
                <span>{quesCount} Questions</span>
                <Clock className="ml-2 h-4 w-4 text-tb-gray-400" />
                <span>{test.duration} min</span>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="mb-4 h-px bg-tb-gray-100" />
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  {showBuySeries ? (
                    <span className="text-xl font-black text-purple-700">Buy Series</span>
                  ) : isPremium ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-tb-blue">Rs {test.price || 0}</span>
                      {discount > 0 && (
                        <span className="text-xs text-tb-gray-400 line-through">Rs {test.originalPrice}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xl font-black text-tb-blue">Free</span>
                  )}
                  <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-tb-gray-400">Plan starting from</p>
                </div>
                {discount > 0 ? (
                  <span className="rounded-lg bg-green-50 px-3 py-2 text-xs font-bold text-green-700">{discount}% OFF</span>
                ) : (
                  <span className="rounded-lg bg-green-50 px-3 py-2 text-xs font-bold text-green-700">Best Value</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" size="md" onClick={(e) => { e.stopPropagation(); navigate('/app/test-series'); }}>Explore</Button>
                <button
                  onClick={handleButtonClick}
                  className={`rounded-lg px-4 py-3 text-sm font-bold text-white active:scale-[0.98] ${
                    isEnrolled
                      ? 'bg-tb-blue hover:bg-tb-blue-dark'
                      : showBuySeries
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : isPremium
                          ? 'bg-amber-600 hover:bg-amber-700'
                          : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {primaryLabel || (isEnrolled ? 'Start Test' : showBuySeries ? 'Buy Now' : isPremium ? 'Unlock' : 'Enroll')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
