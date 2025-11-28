import { Request, Response } from 'express';
import { AuthRequest } from '../types';
import databaseService from '../utils/DatabaseService';
import logger from '../utils/logger';
import { validateCreateTodo, validateUpdateTodo, handleValidationErrors } from '../middleware/validators';

export const getTodos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '인증되지 않은 사용자입니다'
        }
      });
      return;
    }

    // Extract query parameters
    const { startDate, endDate, sort } = req.query;

    // Build where clause for filtering
    const whereClause: any = {
      userId,
      status: 'ACTIVE'  // Only return active todos
    };

    if (startDate) {
      whereClause.startDate = {
        gte: new Date(startDate as string)
      };
    }

    if (endDate) {
      whereClause.dueDate = {
        lte: new Date(endDate as string)
      };
    }

    // Determine sorting order
    const orderBy = sort === 'dueDate'
      ? { dueDate: 'asc' as const }
      : { createdAt: 'desc' as const };

    const todos = await databaseService.prisma.todo.findMany({
      where: whereClause,
      orderBy,
      select: {
        id: true,
        userId: true,
        title: true,
        description: true,
        startDate: true,
        dueDate: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const count = todos.length;

    res.status(200).json({
      success: true,
      data: {
        todos,
        count
      }
    });
  } catch (error: any) {
    logger.error('Get todos error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '할일 목록 조회 중 오류가 발생했습니다'
      }
    });
  }
};

export const createTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '인증되지 않은 사용자입니다'
        }
      });
      return;
    }

    const { title, description, startDate, dueDate } = req.body;

    const newTodo = await databaseService.createTodo({
      userId,
      title,
      description,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate)
    });

    res.status(201).json({
      success: true,
      data: {
        todo: {
          ...newTodo,
          startDate: newTodo.startDate,
          dueDate: newTodo.dueDate
        }
      }
    });
  } catch (error: any) {
    logger.error('Create todo error:', error);

    // Check if it's a validation or specific error from the database
    if (error.message && error.message.includes('Todo not found')) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error.message
        }
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '할일 생성 중 오류가 발생했습니다'
      }
    });
  }
};

export const updateTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '인증되지 않은 사용자입니다'
        }
      });
      return;
    }

    const { id } = req.params;
    const { title, description, startDate, dueDate } = req.body;

    // Prepare update data - only include fields that are provided
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);

    const updatedTodo = await databaseService.updateTodo(id, userId, updateData);

    res.status(200).json({
      success: true,
      data: {
        todo: {
          ...updatedTodo,
          startDate: updatedTodo.startDate,
          dueDate: updatedTodo.dueDate
        }
      }
    });
  } catch (error: any) {
    logger.error('Update todo error:', error);

    if (error.message && error.message.includes('Todo not found')) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: '할일을 찾을 수 없습니다'
        }
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '할일 수정 중 오류가 발생했습니다'
      }
    });
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '인증되지 않은 사용자입니다'
        }
      });
      return;
    }

    const { id } = req.params;

    // Check if todo exists and belongs to user
    const existingTodo = await databaseService.getTodoById(id, userId);
    if (!existingTodo) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: '할일을 찾을 수 없습니다'
        }
      });
      return;
    }

    await databaseService.deleteTodo(id, userId);

    res.status(200).json({
      success: true,
      message: '할일이 삭제되었습니다'
    });
  } catch (error: any) {
    logger.error('Delete todo error:', error);

    if (error.message && error.message.includes('Todo not found')) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: '할일을 찾을 수 없습니다'
        }
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '할일 삭제 중 오류가 발생했습니다'
      }
    });
  }
};
