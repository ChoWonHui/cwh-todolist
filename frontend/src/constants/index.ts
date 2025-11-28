/**
 * Application Constants
 *
 * Centralized location for all application-wide constants.
 */

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  TODOS: {
    LIST: '/todos',
    CREATE: '/todos',
    UPDATE: (id: string) => `/todos/${id}`,
    DELETE: (id: string) => `/todos/${id}`,
  },
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  TODOS: '/todos',
  PROFILE: '/profile',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
} as const;

// Validation Rules
export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  TODO: {
    TITLE_MAX_LENGTH: 200,
    DESCRIPTION_MAX_LENGTH: 1000,
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SIGNUP_SUCCESS: 'Account created successfully! Please log in.',
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'You have been logged out.',
  TODO_CREATED: 'Todo created successfully.',
  TODO_UPDATED: 'Todo updated successfully.',
  TODO_DELETED: 'Todo deleted successfully.',
} as const;

// Application Metadata
export const APP_INFO = {
  NAME: 'Todo List Application',
  VERSION: '1.0.0',
  DESCRIPTION: 'A modern todo list application with authentication',
  AUTHOR: 'CWH Team',
} as const;

// Date Formats
export const DATE_FORMATS = {
  FULL: 'YYYY-MM-DD HH:mm:ss',
  DATE_ONLY: 'YYYY-MM-DD',
  TIME_ONLY: 'HH:mm',
  DISPLAY: 'MMM DD, YYYY',
} as const;

// Timeouts (in milliseconds)
export const TIMEOUTS = {
  DEBOUNCE: 300,
  NOTIFICATION: 3000,
  API_REQUEST: 10000,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;
