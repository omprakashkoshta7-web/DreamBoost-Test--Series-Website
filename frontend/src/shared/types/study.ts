export interface ISubject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  materialCount: number;
}

export interface IPricingPlan {
  plan: 'free' | 'basic' | 'standard' | 'premium';
  price: number;
  originalPrice: number;
}

export interface IStudyMaterial {
  id: string;
  title: string;
  description: string;
  subject: { _id: string; name: string; icon: string; color: string } | string;
  category: 'notes' | 'pdf' | 'video' | 'pyq' | 'short-notes' | 'revision';
  chapter: string;
  thumbnail: string;
  duration: number;
  author: string;
  tags: string[];
  content?: string;
  pdfUrl: string;
  videoUrl: string;
  pricing?: IPricingPlan;
  isLocked?: boolean;
  isPurchased?: boolean;
  createdAt: string;
  progress?: {
    progress: number;
    isCompleted: boolean;
    isBookmarked: boolean;
    isDownloaded: boolean;
    lastAccessedAt: string;
  } | null;
}

export interface IChapter {
  id: string;
  title: string;
  materialCount: number;
}

export interface IMyLibraryItem {
  id: string;
  materialId: string;
  title: string;
  subject: { _id: string; name: string; icon: string; color: string };
  category: string;
  chapter: string;
  thumbnail: string;
  duration: number;
  author: string;
  progress: number;
  isCompleted: boolean;
  isBookmarked: boolean;
  isDownloaded: boolean;
  lastAccessedAt: string;
  completedAt: string;
}

export interface IProfileProgress {
  totalStudyHours: number;
  completionPercent: number;
  completedCount: number;
  totalMaterials: number;
  totalChapters: number;
  weakSubjects: { id: string; name: string; progress: number }[];
  recentActivity: { id: string; title: string; category: string; progress: number; isCompleted: boolean; lastAccessedAt: string }[];
}

export interface IStudyMaterialState {
  subjects: ISubject[];
  materials: IStudyMaterial[];
  selectedMaterial: IStudyMaterial | null;
  chapters: IChapter[];
  libraryItems: IMyLibraryItem[];
  profileProgress: IProfileProgress | null;
  loading: boolean;
  error: string | null;
  pagination: { totalPages: number; currentPage: number; totalMaterials: number };
  libraryPagination: { totalPages: number; currentPage: number; totalMaterials: number };
}
