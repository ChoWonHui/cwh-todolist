import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../src/app';
import prisma from '../../src/utils/prisma';
import { SignupRequest } from '../../src/types';

// Mock the prisma client to isolate our tests
jest.mock('../../src/utils/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

describe('Auth API - Signup', () => {
  const validSignupData: SignupRequest = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'Password123!'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/signup', () => {
    it('should successfully create a new user with valid data', async () => {
      const hashedPassword = await bcrypt.hash(validSignupData.password, 10);
      
      // Mock prisma behavior for successful signup
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null); // No existing user
      (prisma.user.create as jest.Mock).mockResolvedValue({
        id: 'test-user-id',
        username: validSignupData.username,
        email: validSignupData.email,
        password: hashedPassword,
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
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
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
      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null); // username available
      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
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