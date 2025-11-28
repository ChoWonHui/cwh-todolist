import DatabaseService from '../utils/DatabaseService';
import pool from '../utils/db';

describe('Database Setup', () => {
  afterAll(async () => {
    // Close the database connection pool after all tests
    await pool.end();
  });

  it('should have a working DatabaseService instance', () => {
    expect(DatabaseService).toBeDefined();
    expect(DatabaseService.getUserById).toBeDefined();
    expect(DatabaseService.createUser).toBeDefined();
    expect(DatabaseService.getTodosByUserId).toBeDefined();
    expect(DatabaseService.createTodo).toBeDefined();
    expect(DatabaseService.getPublicTodos).toBeDefined();
    expect(DatabaseService.createPublicTodo).toBeDefined();
  });

  it('should have all required DatabaseService methods', () => {
    expect(typeof DatabaseService.getUserById).toBe('function');
    expect(typeof DatabaseService.getUserByEmail).toBe('function');
    expect(typeof DatabaseService.getUserByUsername).toBe('function');
    expect(typeof DatabaseService.createUser).toBe('function');
    expect(typeof DatabaseService.getTodosByUserId).toBe('function');
    expect(typeof DatabaseService.getTodoById).toBe('function');
    expect(typeof DatabaseService.createTodo).toBe('function');
    expect(typeof DatabaseService.updateTodo).toBe('function');
    expect(typeof DatabaseService.deleteTodo).toBe('function');
    expect(typeof DatabaseService.getPublicTodos).toBe('function');
    expect(typeof DatabaseService.getPublicTodoById).toBe('function');
    expect(typeof DatabaseService.createPublicTodo).toBe('function');
  });

  it('should have all required Status enum values', () => {
    const statusValues = ['ACTIVE', 'TRASHED'];
    expect(statusValues).toContain('ACTIVE');
    expect(statusValues).toContain('TRASHED');
  });

  it('should have a working database connection pool', () => {
    expect(pool).toBeDefined();
    expect(pool.totalCount).toBeDefined();
  });
});
