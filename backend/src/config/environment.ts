import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
export const DATABASE_URL = process.env.DATABASE_URL || '';

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL is not set. Please configure your database connection.');
}

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'fallback_jwt_secret') {
  console.warn('JWT_SECRET is using fallback value. Please set a proper secret in production.');
}