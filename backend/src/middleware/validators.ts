import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation rules for signup
export const validateSignup = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('사용자명은 3자 이상 20자 이하여야 합니다')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('사용자명은 영문 대소문자, 숫자, 언더스코어만 사용할 수 있습니다'),
  
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('유효한 이메일 주소를 입력해주세요')
    .isLength({ max: 255 })
    .withMessage('이메일은 255자 이하여야 합니다'),
  
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('비밀번호는 8자 이상 128자 이하여야 합니다')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('비밀번호는 영문 대소문자와 숫자를 각각 1개 이상 포함해야 합니다'),
];

// Validation rules for login
export const validateLogin = [
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('유효한 이메일 주소를 입력해주세요')
    .isLength({ max: 255 })
    .withMessage('이메일은 255자 이하여야 합니다'),
  
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('비밀번호는 8자 이상 128자 이하여야 합니다'),
];

// Validation rules for creating a todo
export const validateCreateTodo = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('할일 제목은 필수입니다')
    .isLength({ min: 1, max: 100 })
    .withMessage('할일 제목은 1자 이상 100자 이하여야 합니다'),

  body('description')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage('할일 설명은 0자 이상 1000자 이하여야 합니다'),

  body('startDate')
    .isISO8601()
    .withMessage('시작 일시는 올바른 날짜 형식이어야 합니다 (ISO 8601)'),

  body('dueDate')
    .isISO8601()
    .withMessage('만료 일시는 올바른 날짜 형식이어야 합니다 (ISO 8601)')
    .custom((value, { req }) => {
      // Check if startDate is also provided in the request
      if (req.body.startDate) {
        const startDate = new Date(req.body.startDate);
        const dueDate = new Date(value);
        if (dueDate <= startDate) {
          throw new Error('만료 일시는 시작 일시 이후여야 합니다');
        }
      }
      return true;
    }),
];

// Validation rules for updating a todo
export const validateUpdateTodo = [
  body('title')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('할일 제목은 1자 이상 100자 이하여야 합니다'),

  body('description')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage('할일 설명은 0자 이상 1000자 이하여야 합니다'),

  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('시작 일시는 올바른 날짜 형식이어야 합니다 (ISO 8601)'),

  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('만료 일시는 올바른 날짜 형식이어야 합니다 (ISO 8601)')
    .custom((value, { req }) => {
      // Only validate if both dates are provided in the request
      if (req.body.startDate && value) {
        const startDate = new Date(req.body.startDate);
        const dueDate = new Date(value);
        if (dueDate <= startDate) {
          throw new Error('만료 일시는 시작 일시 이후여야 합니다');
        }
      }
      return true;
    }),
];

// Validation error handler middleware
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      field: (error as any).path || (error as any).param || 'unknown',
      message: error.msg || 'Validation error'
    }));

    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: '입력값 검증에 실패했습니다',
        details: formattedErrors
      }
    });
    return;
  }

  next();
};