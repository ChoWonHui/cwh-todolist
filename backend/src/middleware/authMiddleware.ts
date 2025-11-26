import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';

// Extend the Express Request type to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Load JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_development';

/**
 * Authentication middleware to validate JWT tokens
 * Extracts token from Authorization header and verifies it
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '인증 토큰이 필요합니다'
        }
      });
      return;
    }

    // Check if header follows Bearer scheme format
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authorization 헤더는 Bearer 토큰 형식이어야 합니다'
        }
      });
      return;
    }

    const token = tokenParts[1];

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    // Attach user ID to the request object
    req.userId = decoded.userId;
    
    // Call the next middleware/route handler
    next();
  } catch (error: any) {
    // Handle different types of token errors
    let errorCode = 'UNAUTHORIZED';
    let errorMessage = '유효하지 않은 인증 토큰입니다';

    if (error.name === 'TokenExpiredError') {
      errorCode = 'TOKEN_EXPIRED';
      errorMessage = '토큰이 만료되었습니다';
    } else if (error.name === 'JsonWebTokenError') {
      errorCode = 'INVALID_TOKEN';
      errorMessage = '유효하지 않은 토큰 형식입니다';
    } else if (error.name === 'NotBeforeError') {
      errorCode = 'TOKEN_NOT_ACTIVE';
      errorMessage = '토큰이 아직 활성화되지 않았습니다';
    }

    res.status(401).json({
      success: false,
      error: {
        code: errorCode,
        message: errorMessage
      }
    });
  }
};