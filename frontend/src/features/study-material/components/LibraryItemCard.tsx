import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, Bookmark, Download, Trash2 } from '@shared/icons';

interface LibraryItem {
  id: string;
  materialId: string;
  category: string;
  duration: number;
  title: string;
  subject?: { name: string };
  isCompleted: boolean;
  isBookmarked: boolean;
  isDownloaded: boolean;
  progress: number;
}

interface LibraryItemCardProps {
  item: LibraryItem;
  onRemoveBookmark: (id: string, materialId: string) => void;
}

const LibraryItemCard: React.FC<LibraryItemCardProps> = ({ item, onRemoveBookmark }) => {
  const navigate = useNavigate();
  const sub = item.subject;

  return (
    <div
      className="bg-white rounded-xl border border-tb-gray-100 p-4 hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => navigate(`/app/study-material/view/${item.materialId}`)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium px-2 py-0.5 bg-tb-blue-light text-tb-blue rounded-full capitalize">{item.category}</span>
            {item.duration > 0 && <span className="text-xs text-tb-gray-400"><Clock className="w-3 h-3 inline" />{item.duration}m</span>}
          </div>
          <h3 className="font-semibold text-tb-navy text-sm line-clamp-2 group-hover:text-tb-blue transition-colors">{item.title}</h3>
          {sub && <p className="text-xs text-tb-gray-400 mt-1">{sub.name}</p>}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onRemoveBookmark(item.id, item.materialId); }}
          className="p-1.5 rounded-lg hover:bg-red-50 text-tb-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
          title="Remove"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-3 pt-3 border-t border-tb-gray-50">
        <div className="flex items-center justify-between text-xs text-tb-gray-400">
          <div className="flex items-center gap-3">
            {item.isCompleted && <span className="flex items-center gap-1 text-green-600"><CheckCircle className="w-3 h-3" />Completed</span>}
            {item.isBookmarked && <span className="flex items-center gap-1 text-tb-orange"><Bookmark className="w-3 h-3" />Bookmarked</span>}
            {item.isDownloaded && <span className="flex items-center gap-1 text-tb-blue"><Download className="w-3 h-3" />Downloaded</span>}
          </div>
          {item.progress > 0 && !item.isCompleted && (
            <span>{item.progress}%</span>
          )}
        </div>
        {item.progress > 0 && !item.isCompleted && (
          <div className="w-full h-1.5 bg-tb-gray-100 rounded-full mt-1.5 overflow-hidden">
            <div className="h-full bg-tb-blue rounded-full" style={{ width: `${item.progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryItemCard;
