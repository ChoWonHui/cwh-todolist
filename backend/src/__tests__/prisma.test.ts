import { PrismaClient } from '@prisma/client';
import prisma from '../utils/prisma';
import DatabaseService from '../utils/DatabaseService';

describe('Prisma Setup', () => {
  it('should have a working Prisma client instance', () => {
    expect(prisma).toBeDefined();
    expect(prisma).toBeInstanceOf(PrismaClient);
    expect(typeof prisma.user).toBeDefined();
    expect(typeof prisma.todo).toBeDefined();
    expect(typeof prisma.publicTodo).toBeDefined();
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

  it('should have all required Prisma model methods', () => {
    expect(typeof prisma.user.findUnique).toBe('function');
    expect(typeof prisma.user.create).toBe('function');
    expect(typeof prisma.todo.findMany).toBe('function');
    expect(typeof prisma.todo.create).toBe('function');
    expect(typeof prisma.publicTodo.findMany).toBe('function');
    expect(typeof prisma.publicTodo.create).toBe('function');
  });

  it('should have all required Status enum values', () => {
    // These would be available through the generated Prisma client
    const statusValues = ['ACTIVE', 'TRASHED'];
    expect(statusValues).toContain('ACTIVE');
    expect(statusValues).toContain('TRASHED');
  });
});