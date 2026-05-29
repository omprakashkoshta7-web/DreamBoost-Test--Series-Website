import { BookOpen, FileText } from '@shared/icons';

const ONE_HOUR_MS = 60 * 60 * 1000;
const ENDING_REMINDER_MS = 24 * ONE_HOUR_MS;

export const formatCountdown = (msLeft: number) => {
  const totalSeconds = Math.max(0, Math.floor(msLeft / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':');
};

const gradientMap: Record<string, { from: string; to: string; icon: any }> = {
  default: { from: 'from-blue-500', to: 'to-indigo-600', icon: BookOpen },
  SSC: { from: 'from-cyan-500', to: 'to-blue-600', icon: FileText },
  Banking: { from: 'from-emerald-500', to: 'to-teal-600', icon: BookOpen },
  Railway: { from: 'from-orange-500', to: 'to-red-500', icon: BookOpen },
  JEE: { from: 'from-purple-500', to: 'to-pink-500', icon: BookOpen },
  NEET: { from: 'from-green-500', to: 'to-emerald-600', icon: BookOpen },
  UPSC: { from: 'from-rose-500', to: 'to-pink-600', icon: BookOpen },
};

export const useTestCard = (category: string, activeUntil?: string, currentTime = 0) => {
  const g = gradientMap[category] || gradientMap.default;
  const Icon = g.icon;

  const activeUntilDate = activeUntil ? new Date(activeUntil) : null;
  const msLeft = activeUntilDate && currentTime > 0 ? activeUntilDate.getTime() - currentTime : null;
  const isEndingSoon = msLeft !== null && msLeft > 0 && msLeft <= ENDING_REMINDER_MS;
  const endingCountdown = isEndingSoon && msLeft !== null ? formatCountdown(msLeft) : '';

  return { g, Icon, msLeft, isEndingSoon, endingCountdown };
};
