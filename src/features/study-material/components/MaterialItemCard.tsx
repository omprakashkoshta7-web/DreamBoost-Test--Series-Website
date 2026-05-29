import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, FileText, Video, RefreshCw, Edit } from '@shared/icons';

const categoryIcons: Record<string, any> = {
  notes: FileText, pdf: FileText, video: Video, pyq: FileText,
  'short-notes': Edit, revision: RefreshCw,
};

interface Material {
  id: string;
  category: string;
  title: string;
  description: string;
  duration: number;
  author: string;
}

interface MaterialItemCardProps {
  material: Material;
}

const MaterialItemCard: React.FC<MaterialItemCardProps> = ({ material }) => {
  const navigate = useNavigate();
  const CatIcon = categoryIcons[material.category] || BookOpen;
  return (
    <div
      onClick={() => navigate(`/app/study-material/view/${material.id}`)}
      className="bg-white rounded-xl border border-tb-gray-100 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-tb-blue-light flex items-center justify-center flex-shrink-0">
          <CatIcon className="w-5 h-5 text-tb-blue" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium px-2 py-0.5 bg-tb-blue-light text-tb-blue rounded-full capitalize">{material.category}</span>
          </div>
          <h3 className="font-semibold text-tb-navy text-sm line-clamp-2 group-hover:text-tb-blue transition-colors">{material.title}</h3>
          <p className="text-xs text-tb-gray-400 mt-1 line-clamp-1">{material.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-tb-gray-400">
            {material.duration > 0 && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{material.duration}m</span>}
            {material.author && <span>by {material.author}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialItemCard;
