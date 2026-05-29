import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Chapter {
  id: string;
  title: string;
  materialCount: number;
}

interface ChapterCardProps {
  chapter: Chapter;
  subjectId: string;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, subjectId }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/app/study-material/subject/${subjectId}?chapter=${encodeURIComponent(chapter.title)}`)}
      className="bg-white rounded-xl border border-tb-gray-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-tb-navy text-sm">{chapter.title}</h3>
        <span className="text-xs text-tb-gray-400 bg-tb-gray-50 px-2 py-1 rounded-lg">{chapter.materialCount} items</span>
      </div>
    </div>
  );
};

export default ChapterCard;
