import prisma from './prisma';

class DatabaseService {
  prisma = prisma;

  // User operations
  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username },
    });
  }

  async createUser(data: { username: string; email: string; password: string }) {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  // Todo operations
  async getTodosByUserId(userId: string, status?: 'ACTIVE' | 'TRASHED') {
    return await prisma.todo.findMany({
      where: {
        userId,
        status: status || 'ACTIVE',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getTodoById(id: string, userId: string) {
    return await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async createTodo(data: {
    userId: string;
    title: string;
    description?: string;
    startDate: Date;
    dueDate: Date;
  }) {
    return await prisma.todo.create({
      data: {
        ...data,
        status: 'ACTIVE',
      },
    });
  }

  async updateTodo(id: string, userId: string, data: {
    title?: string;
    description?: string;
    startDate?: Date;
    dueDate?: Date;
  }) {
    // First verify the todo exists and belongs to the user
    const existingTodo = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTodo) {
      throw new Error('Todo not found or does not belong to user');
    }

    return await prisma.todo.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteTodo(id: string, userId: string) {
    // First verify the todo exists and belongs to the user
    const existingTodo = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTodo) {
      throw new Error('Todo not found or does not belong to user');
    }

    return await prisma.todo.delete({
      where: {
        id,
      },
    });
  }

  // PublicTodo operations
  async getPublicTodos() {
    return await prisma.publicTodo.findMany({
      orderBy: {
        eventDate: 'asc',
      },
    });
  }

  async getPublicTodoById(id: string) {
    return await prisma.publicTodo.findUnique({
      where: { id },
    });
  }

  async createPublicTodo(data: {
    title: string;
    description?: string;
    eventDate: Date;
    type: string;
  }) {
    return await prisma.publicTodo.create({
      data,
    });
  }
}

export default new DatabaseService();