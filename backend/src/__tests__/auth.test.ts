import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import app from '../../src/app';
import prisma from '../../src/utils/prisma';
import { SignupRequest, LoginRequest } from '../../src/types';
import databaseService from '../../src/utils/DatabaseService';

// Mock the prisma client to isolate our tests
jest.mock('../../src/utils/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

// Mock bcrypt.compare to isolate the login tests
jest.mock('bcrypt', () => ({
  ...jest.requireActual('bcrypt'),
  compare: jest.fn(),
}));

// Mock jsonwebtoken to isolate the tests
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('Auth API - Signup', () => {
  const validSignupData: SignupRequest = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'Password123!'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock jwt.sign to return a token for signup tests
    (jwt.sign as jest.Mock).mockReturnValue('mocked-jwt-token');
  });

  describe('POST /api/auth/signup', () => {
    it('should successfully create a new user with valid data', async () => {
      const hashedPassword = await bcrypt.hash(validSignupData.password, 10);
      
      // Mock prisma behavior for successful signup
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(null) // username available
        .mockResolvedValueOnce(null); // email available
      (prisma.user.create as jest.Mock).mockResolvedValue({
        id: 'test-user-id',
        username: validSignupData.username,
        email: validSignupData.email,
        password: hashedPassword, // password will be in the result since we're mocking
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await request(app)
        .post('/api/auth/signup')
        .send(validSignupData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.user.username).toBe(validSignupData.username);
      expect(response.body.data.user.email).toBe(validSignupData.email);
      expect(response.body.data.token).toBeDefined();

      // Verify that password was hashed (not saved in plain text)
      expect(response.body.data.user.password).toBeUndefined();
      
      // Verify prisma was called correctly
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(2); // Once for username, once for email
      expect(prisma.user.create).toHaveBeenCalledTimes(1);
    });

    it('should return 400 when username is already taken', async () => {
      // Mock prisma to return an existing user with the same username
      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'existing-user-id',
        username: validSignupData.username,
      });

      const response = await request(app)
        .post('/api/auth/signup')
        .send(validSignupData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('CONFLICT');
      expect(response.body.error.message).toBe('이미 사용 중인 사용자명입니다');
    });

    it('should return 400 when email is already taken', async () => {
      // Mock prisma to return an existing user with the same email
      // First call returns null (username available), second returns existing user (email taken)
      (prisma.user.findUnique as jest.Mock)
        .mockResolvedValueOnce(null) // username available
        .mockResolvedValueOnce({
          id: 'existing-user-id',
          email: validSignupData.email,
        }); // email taken

      const response = await request(app)
        .post('/api/auth/signup')
        .send(validSignupData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('CONFLICT');
      expect(response.body.error.message).toBe('이미 사용 중인 이메일입니다');
    });

    it('should return 400 with validation errors when required fields are missing', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({}) // Empty body
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.details).toBeDefined();
    });

    it('should return 400 with validation errors when password is too short', async () => {
      const invalidData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'short' // Too short
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 with validation errors when email format is invalid', async () => {
      const invalidData = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'Password123!'
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 500 when database error occurs', async () => {
      // Mock prisma to throw an error
      (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/auth/signup')
        .send(validSignupData)
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('INTERNAL_ERROR');
    });
  });
});

describe('Auth API - Login', () => {
  const validLoginData: LoginRequest = {
    email: 'test@example.com',
    password: 'Password123!'
  };

  const mockUser = {
    id: 'test-user-id',
    username: 'testuser',
    email: 'test@example.com',
    password: '$2b$10$G/k1w6x51PzZ5YyB1Qy3.OFb7b5f7yq1ZyQxQ2r4x6y8z0A1C2E', // hashed password
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock jwt.sign to return a token for login tests
    (jwt.sign as jest.Mock).mockReturnValue('mocked-jwt-token');
  });

  describe('POST /api/auth/login', () => {
    it('should successfully login a user with valid credentials', async () => {
      // Mock database service to return a user
      const getUserByEmailSpy = jest.spyOn(databaseService, 'getUserByEmail').mockResolvedValue(mockUser);
      
      // Mock bcrypt to return true for password comparison
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      
      // Mock jwt to return a valid token
      const mockToken = 'mock.jwt.token';
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const response = await request(app)
        .post('/api/auth/login')
        .send(validLoginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.token).toBe(mockToken);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.user.id).toBe(mockUser.id);
      expect(response.body.data.user.email).toBe(mockUser.email);
      expect(response.body.data.user.username).toBe(mockUser.username);

      // Verify that bcrypt.compare was called to validate password
      expect(bcrypt.compare).toHaveBeenCalledWith(validLoginData.password, mockUser.password);
      
      // Verify that the database service method was called
      expect(getUserByEmailSpy).toHaveBeenCalledWith(validLoginData.email);
      
      // Clean up
      getUserByEmailSpy.mockRestore();
    });

    it('should return 401 when user does not exist', async () => {
      // Mock database service to return null (user not found)
      const getUserByEmailSpy = jest.spyOn(databaseService, 'getUserByEmail').mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send(validLoginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('UNAUTHORIZED');
      expect(response.body.error.message).toBe('이메일 또는 비밀번호가 올바르지 않습니다');
      
      // Clean up
      getUserByEmailSpy.mockRestore();
    });

    it('should return 401 when password is incorrect', async () => {
      // Mock database service to return a user
      const getUserByEmailSpy = jest.spyOn(databaseService, 'getUserByEmail').mockResolvedValue(mockUser);
      
      // Mock bcrypt to return false for password comparison
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const response = await request(app)
        .post('/api/auth/login')
        .send(validLoginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('UNAUTHORIZED');
      expect(response.body.error.message).toBe('이메일 또는 비밀번호가 올바르지 않습니다');
      
      // Clean up
      getUserByEmailSpy.mockRestore();
    });

    it('should return 400 with validation errors when required fields are missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({}) // Empty body
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.details).toBeDefined();
    });

    it('should return 400 with validation errors when email format is invalid', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'Password123!'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 500 when database error occurs', async () => {
      // Mock database service to throw an error
      const getUserByEmailSpy = jest.spyOn(databaseService, 'getUserByEmail').mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/auth/login')
        .send(validLoginData)
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.code).toBe('INTERNAL_ERROR');
      
      // Clean up
      getUserByEmailSpy.mockRestore();
    });
  });
});