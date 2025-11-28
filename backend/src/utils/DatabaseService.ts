import { query } from './db';

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  startDate: Date;
  dueDate: Date;
  status: 'ACTIVE' | 'TRASHED';
  createdAt: Date;
  updatedAt: Date;
}

interface PublicTodo {
  id: string;
  title: string;
  description: string | null;
  eventDate: Date;
  type: string;
  createdAt: Date;
}

class DatabaseService {
  // User operations
  async getUserById(id: string): Promise<User | null> {
    const result = await query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const result = await query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0] || null;
  }

  async createUser(data: { username: string; email: string; password: string }) {
    const result = await query(
      `INSERT INTO users (id, username, email, password, "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW())
       RETURNING id, username, email, "createdAt", "updatedAt"`,
      [data.username, data.email, data.password]
    );
    return result.rows[0];
  }

  // Todo operations
  async getTodosByUserId(userId: string, status: 'ACTIVE' | 'TRASHED' = 'ACTIVE'): Promise<Todo[]> {
    const result = await query(
      `SELECT * FROM todos
       WHERE "userId" = $1 AND status = $2
       ORDER BY "createdAt" DESC`,
      [userId, status]
    );
    return result.rows;
  }

  async getTodoById(id: string, userId: string): Promise<Todo | null> {
    const result = await query(
      `SELECT * FROM todos
       WHERE id = $1 AND "userId" = $2`,
      [id, userId]
    );
    return result.rows[0] || null;
  }

  async createTodo(data: {
    userId: string;
    title: string;
    description?: string;
    startDate: Date;
    dueDate: Date;
  }): Promise<Todo> {
    const result = await query(
      `INSERT INTO todos (id, "userId", title, description, "startDate", "dueDate", status, "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, 'ACTIVE', NOW(), NOW())
       RETURNING *`,
      [data.userId, data.title, data.description || null, data.startDate, data.dueDate]
    );
    return result.rows[0];
  }

  async updateTodo(id: string, userId: string, data: {
    title?: string;
    description?: string;
    startDate?: Date;
    dueDate?: Date;
  }): Promise<Todo> {
    // First verify the todo exists and belongs to the user
    const existingTodo = await this.getTodoById(id, userId);

    if (!existingTodo) {
      throw new Error('Todo not found or does not belong to user');
    }

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(data.title);
    }
    if (data.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(data.description);
    }
    if (data.startDate !== undefined) {
      updates.push(`"startDate" = $${paramIndex++}`);
      values.push(data.startDate);
    }
    if (data.dueDate !== undefined) {
      updates.push(`"dueDate" = $${paramIndex++}`);
      values.push(data.dueDate);
    }

    updates.push(`"updatedAt" = NOW()`);
    values.push(id);

    const result = await query(
      `UPDATE todos
       SET ${updates.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING *`,
      values
    );

    return result.rows[0];
  }

  async deleteTodo(id: string, userId: string): Promise<void> {
    // First verify the todo exists and belongs to the user
    const existingTodo = await this.getTodoById(id, userId);

    if (!existingTodo) {
      throw new Error('Todo not found or does not belong to user');
    }

    await query('DELETE FROM todos WHERE id = $1', [id]);
  }

  // PublicTodo operations
  async getPublicTodos(): Promise<PublicTodo[]> {
    const result = await query(
      `SELECT * FROM public_todos
       ORDER BY "eventDate" ASC`
    );
    return result.rows;
  }

  async getPublicTodoById(id: string): Promise<PublicTodo | null> {
    const result = await query(
      'SELECT * FROM public_todos WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async createPublicTodo(data: {
    title: string;
    description?: string;
    eventDate: Date;
    type: string;
  }): Promise<PublicTodo> {
    const result = await query(
      `INSERT INTO public_todos (id, title, description, "eventDate", type, "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW())
       RETURNING *`,
      [data.title, data.description || null, data.eventDate, data.type]
    );
    return result.rows[0];
  }
}

export default new DatabaseService();
