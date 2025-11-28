import { Response } from 'express';
import { AuthRequest } from '../types';
import databaseService from '../utils/DatabaseService';

/**
 * @desc    Get all todos for authenticated user
 * @route   GET /api/todos
 * @access  Private
 */
export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'User not authenticated'
        }
      });
    }

    const todos = await databaseService.getTodosByUserId(userId, 'ACTIVE');

    return res.status(200).json({
      success: true,
      data: {
        todos,
        count: todos.length
      }
    });
  } catch (error) {
    console.error('Get todos error:', error);
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch todos'
      }
    });
  }
};

/**
 * @desc    Create new todo
 * @route   POST /api/todos
 * @access  Private
 */
export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'User not authenticated'
        }
      });
    }

    const { title, description, startDate, dueDate } = req.body;

    const todo = await databaseService.createTodo({
      userId,
      title,
      description,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
    });

    return res.status(201).json({
      success: true,
      data: {
        todo
      }
    });
  } catch (error) {
    console.error('Create todo error:', error);
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create todo'
      }
    });
  }
};

/**
 * @desc    Update todo
 * @route   PUT /api/todos/:id
 * @access  Private
 */
export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'User not authenticated'
        }
      });
    }

    // Check if todo exists and belongs to user
    const existingTodo = await databaseService.getTodoById(id, userId);

    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Todo not found'
        }
      });
    }

    const { title, description, startDate, dueDate } = req.body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);

    const todo = await databaseService.updateTodo(id, userId, updateData);

    return res.status(200).json({
      success: true,
      data: {
        todo
      }
    });
  } catch (error) {
    console.error('Update todo error:', error);
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to update todo'
      }
    });
  }
};

/**
 * @desc    Delete todo
 * @route   DELETE /api/todos/:id
 * @access  Private
 */
export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'User not authenticated'
        }
      });
    }

    // Check if todo exists and belongs to user
    const existingTodo = await databaseService.getTodoById(id, userId);

    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Todo not found'
        }
      });
    }

    await databaseService.deleteTodo(id, userId);

    return res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    console.error('Delete todo error:', error);
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to delete todo'
      }
    });
  }
};
