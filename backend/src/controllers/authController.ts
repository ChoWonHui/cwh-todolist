import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignupRequest } from '../types';
import databaseService from '../utils/DatabaseService';

// Load JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_development';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password }: SignupRequest = req.body;

    // Input validation
    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '사용자명, 이메일, 비밀번호는 필수 입력값입니다',
          details: [
            { field: 'username', message: '사용자명을 입력해주세요' },
            { field: 'email', message: '이메일을 입력해주세요' },
            { field: 'password', message: '비밀번호를 입력해주세요' }
          ]
        }
      });
      return;
    }

    // Additional validation checks
    if (username.length < 3 || username.length > 20) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '사용자명은 3자 이상 20자 이하여야 합니다',
          details: [
            { field: 'username', message: '사용자명은 3자 이상 20자 이하여야 합니다' }
          ]
        }
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '유효한 이메일 주소를 입력해주세요',
          details: [
            { field: 'email', message: '유효한 이메일 주소를 입력해주세요' }
          ]
        }
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '비밀번호는 최소 8자 이상이어야 합니다',
          details: [
            { field: 'password', message: '비밀번호는 최소 8자 이상이어야 합니다' }
          ]
        }
      });
      return;
    }

    // Check if username or email already exists
    const existingUserByUsername = await databaseService.getUserByUsername(username);
    if (existingUserByUsername) {
      res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: '이미 사용 중인 사용자명입니다'
        }
      });
      return;
    }

    const existingUserByEmail = await databaseService.getUserByEmail(email);
    if (existingUserByEmail) {
      res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: '이미 사용 중인 이메일입니다'
        }
      });
      return;
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user in the database
    const user = await databaseService.createUser({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } as jwt.SignOptions
    );

    // Return success response (without password)
    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '회원가입 처리 중 오류가 발생했습니다'
      }
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    // Input validation
    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '이메일과 비밀번호는 필수 입력값입니다',
          details: [
            { field: 'email', message: '이메일을 입력해주세요' },
            { field: 'password', message: '비밀번호를 입력해주세요' }
          ]
        }
      });
      return;
    }

    // Additional email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '유효한 이메일 주소를 입력해주세요',
          details: [
            { field: 'email', message: '유효한 이메일 주소를 입력해주세요' }
          ]
        }
      });
      return;
    }

    // Find user by email
    const user = await databaseService.getUserByEmail(email);
    if (!user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '이메일 또는 비밀번호가 올바르지 않습니다'
        }
      });
      return;
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '이메일 또는 비밀번호가 올바르지 않습니다'
        }
      });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } as jwt.SignOptions
    );

    // Return success response (without password)
    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '로그인 처리 중 오류가 발생했습니다'
      }
    });
  }
};