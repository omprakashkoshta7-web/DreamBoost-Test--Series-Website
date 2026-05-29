// Global shared types
export interface IUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  bio?: string;
  phone?: string;
  city?: string;
  state?: string;
  targetExam?: string;
  education?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string>;
}

export interface IPaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface IBaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
