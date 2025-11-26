import { Router } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController';
import { authenticate } from '../middleware/authMiddleware';
import { validateCreateTodo, validateUpdateTodo, handleValidationErrors } from '../middleware/validators';

const router = Router();

// GET /api/todos - 할일 목록 조회
router.get('/', authenticate, getTodos);

// POST /api/todos - 할일 추가
router.post('/', authenticate, validateCreateTodo, handleValidationErrors, createTodo);

// PUT /api/todos/:id - 할일 수정
router.put('/:id', authenticate, validateUpdateTodo, handleValidationErrors, updateTodo);

// DELETE /api/todos/:id - 할일 삭제
router.delete('/:id', authenticate, deleteTodo);

export default router;