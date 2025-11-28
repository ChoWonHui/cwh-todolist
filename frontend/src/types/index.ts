// User types
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Todo types
export interface Todo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startDate: string; // ISO date string
  dueDate: string;   // ISO date string
  status: 'ACTIVE' | 'TRASHED';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  startDate: string; // ISO date string
  dueDate: string;   // ISO date string
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  startDate?: string; // ISO date string
  dueDate?: string;   // ISO date string
  status?: 'ACTIVE' | 'TRASHED';
}

// Auth types
export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}

// API Error types
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
