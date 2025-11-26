// Common types for the application

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Todo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startDate: Date;
  dueDate: Date;
  status: 'ACTIVE' | 'TRASHED';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
}