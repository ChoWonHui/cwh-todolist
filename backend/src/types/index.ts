import { Request } from 'express';

// Entity types
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

export interface PublicTodo {
  id: string;
  title: string;
  description?: string;
  eventDate: Date;
  type: string;
  createdAt: Date;
}

// Request types
export interface AuthRequest extends Request {
  userId?: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  startDate: Date;
  dueDate: Date;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
}

export interface CreatePublicTodoRequest {
  title: string;
  description?: string;
  eventDate: Date;
  type: string;
}

export interface UpdatePublicTodoRequest {
  title?: string;
  description?: string;
  eventDate?: Date;
  type?: string;
}

// Response types
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

export interface AuthSuccessResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}

export interface TodoResponse {
  success: boolean;
  data: {
    todo: Todo;
  };
}

export interface TodoListResponse {
  success: boolean;
  data: {
    todos: Todo[];
    count: number;
  };
}

export interface PublicTodoResponse {
  success: boolean;
  data: {
    publicTodo: PublicTodo;
  };
}

export interface PublicTodoListResponse {
  success: boolean;
  data: {
    publicTodos: PublicTodo[];
    count: number;
  };
}

export interface SuccessResponse {
  success: boolean;
  message: string;
}

export interface ErrorResponse {
  success: boolean;
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
}

// JWT and authentication types
export interface JWTPayload {
  userId: string;
  iat: number;
  exp: number;
}

// Common utility types
export type Status = 'ACTIVE' | 'TRASHED';

// API parameter types
export interface TodoQueryParams {
  startDate?: string;
  endDate?: string;
  sort?: 'createdAt' | 'dueDate';
}