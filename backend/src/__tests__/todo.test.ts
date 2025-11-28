import request from 'supertest';
import app from '../app';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../types';

// Mock the DatabaseService module with a factory function to avoid initialization order issues
jest.mock('../utils/DatabaseService', () => {
  const mockDatabaseService = {
    prisma: {
      todo: {
        findMany: jest.fn(),
      },
    },
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
    getTodoById: jest.fn(),
  };
  return mockDatabaseService;
});

import databaseService from '../utils/DatabaseService';

// Test user data
const mockUser: User = {
  id: 'test-user-id',
  username: 'testuser',
  email: 'test@example.com',
  createdAt: new Date(),
  updatedAt: new Date()
};

// JWT Secret for testing
const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

describe('Todo API', () => {
  let authToken: string;

  beforeAll(async () => {
    // Set the JWT secret in the environment for this test
    process.env.JWT_SECRET = JWT_SECRET;

    // Create a JWT token for testing
    authToken = jwt.sign(
      { userId: mockUser.id, email: mockUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  });

  afterAll(() => {
    // Clean up environment
    delete process.env.JWT_SECRET;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/todos', () => {
    it('should return todos for authenticated user', async () => {
      const mockTodos = [
        {
          id: 'todo-1',
          userId: mockUser.id,
          title: 'Test Todo',
          description: 'Test Description',
          startDate: new Date(),
          dueDate: new Date(Date.now() + 86400000), // Tomorrow
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      (databaseService.prisma.todo.findMany as jest.MockedFunction<any>).mockResolvedValue(mockTodos);

      const response = await request(app)
        .get('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.todos).toHaveLength(1);
      expect(response.body.data.todos[0].title).toBe('Test Todo');
    });

    it('should return 401 for unauthenticated user', async () => {
      const response = await request(app)
        .get('/api/todos')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });
  });

  describe('POST /api/todos', () => {
    const newTodoData = {
      title: 'New Todo',
      description: 'New Todo Description',
      startDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 86400000).toISOString() // Tomorrow
    };

    it('should create a new todo for authenticated user', async () => {
      const createdTodo = {
        id: 'new-todo-id',
        userId: mockUser.id,
        title: newTodoData.title,
        description: newTodoData.description,
        startDate: new Date(newTodoData.startDate),
        dueDate: new Date(newTodoData.dueDate),
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (databaseService.createTodo as jest.MockedFunction<any>).mockResolvedValue(createdTodo);

      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newTodoData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.todo.title).toBe(newTodoData.title);
    });

    it('should return 400 for invalid input data', async () => {
      const invalidTodoData = {
        title: '', // Empty title should fail validation
        startDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 86400000).toISOString()
      };

      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidTodoData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 401 for unauthenticated user', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send(newTodoData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });
  });

  describe('PUT /api/todos/:id', () => {
    const updateData = {
      title: 'Updated Todo',
      description: 'Updated Description'
    };

    it('should update an existing todo for authenticated user', async () => {
      const updatedTodo = {
        id: 'todo-1',
        userId: mockUser.id,
        title: updateData.title,
        description: updateData.description,
        startDate: new Date(),
        dueDate: new Date(Date.now() + 86400000),
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (databaseService.updateTodo as jest.MockedFunction<any>).mockResolvedValue(updatedTodo);

      const response = await request(app)
        .put('/api/todos/todo-1')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.todo.title).toBe(updateData.title);
    });

    it('should return 404 when todo does not exist', async () => {
      (databaseService.updateTodo as jest.MockedFunction<any>).mockRejectedValue(new Error('Todo not found or does not belong to user'));

      const response = await request(app)
        .put('/api/todos/nonexistent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('NOT_FOUND');
    });

    it('should return 401 for unauthenticated user', async () => {
      const response = await request(app)
        .put('/api/todos/todo-1')
        .send(updateData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should delete an existing todo for authenticated user', async () => {
      // Mock that the todo exists and belongs to the user
      (databaseService.getTodoById as jest.MockedFunction<any>).mockResolvedValue({
        id: 'todo-1',
        userId: mockUser.id,
        title: 'Test Todo',
        description: 'Test Description',
        startDate: new Date(),
        dueDate: new Date(Date.now() + 86400000),
        status: 'ACTIVE' as 'ACTIVE' | 'TRASHED',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      (databaseService.deleteTodo as jest.MockedFunction<any>).mockResolvedValue(undefined);

      const response = await request(app)
        .delete('/api/todos/todo-1')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('할일이 삭제되었습니다');
    });

    it('should return 404 when todo does not exist', async () => {
      // Mock that the todo does not exist
      (databaseService.getTodoById as jest.MockedFunction<any>).mockResolvedValue(null);

      const response = await request(app)
        .delete('/api/todos/nonexistent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('NOT_FOUND');
    });

    it('should return 401 for unauthenticated user', async () => {
      const response = await request(app)
        .delete('/api/todos/todo-1')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('UNAUTHORIZED');
    });
  });

  describe('Validation Tests', () => {
    it('should reject todo with dueDate before startDate', async () => {
      const invalidTodoData = {
        title: 'Test Todo',
        description: 'Test Description',
        startDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        dueDate: new Date().toISOString() // Today (before start date)
      };

      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidTodoData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });
});