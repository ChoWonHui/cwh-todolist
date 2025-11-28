import axios from 'axios';
import type {
  SignupRequest,
  LoginRequest,
  AuthResponse,
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  ApiResponse
} from '../types';
import { config } from '../config/env';

const axiosInstance = axios.create({
  baseURL: config.api.url,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove token and redirect to login if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
};

// Todo API
export const todoApi = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await axiosInstance.get<ApiResponse<{ todos: Todo[]; count: number }>>('/todos');
    return response.data.data.todos;
  },

  createTodo: async (data: CreateTodoRequest): Promise<Todo> => {
    const response = await axiosInstance.post<ApiResponse<{ todo: Todo }>>('/todos', data);
    return response.data.data.todo;
  },

  updateTodo: async (id: string, data: UpdateTodoRequest): Promise<Todo> => {
    const response = await axiosInstance.put<ApiResponse<{ todo: Todo }>>(`/todos/${id}`, data);
    return response.data.data.todo;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await axiosInstance.delete<ApiResponse<void>>(`/todos/${id}`);
  },
};

export default axiosInstance;
