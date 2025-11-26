import {
  User,
  Todo,
  PublicTodo,
  AuthRequest,
  ApiResponse,
  SignupRequest,
  LoginRequest,
  CreateTodoRequest,
  UpdateTodoRequest,
  AuthSuccessResponse,
  TodoResponse,
  TodoListResponse,
  SuccessResponse,
  ErrorResponse,
  JWTPayload,
  PublicTodoResponse
} from '../types';

// Test to ensure TypeScript interfaces are correctly defined and can be instantiated
describe('TypeScript Interfaces', () => {
  it('should properly define User interface', () => {
    const user: User = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      username: 'testuser',
      email: 'test@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    expect(user.id).toBeDefined();
    expect(user.username).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });

  it('should properly define Todo interface', () => {
    const todo: Todo = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      userId: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Test todo',
      description: 'Test description',
      startDate: new Date(),
      dueDate: new Date(),
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    expect(todo.id).toBeDefined();
    expect(todo.userId).toBeDefined();
    expect(todo.title).toBeDefined();
    expect(todo.startDate).toBeDefined();
    expect(todo.dueDate).toBeDefined();
    expect(todo.status).toBeDefined();
  });

  it('should properly define PublicTodo interface', () => {
    const publicTodo: PublicTodo = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'National Holiday',
      description: 'Public holiday description',
      eventDate: new Date(),
      type: 'NATIONAL_HOLIDAY',
      createdAt: new Date()
    };
    
    expect(publicTodo.id).toBeDefined();
    expect(publicTodo.title).toBeDefined();
    expect(publicTodo.eventDate).toBeDefined();
    expect(publicTodo.type).toBeDefined();
  });

  it('should properly define AuthRequest interface', () => {
    // This interface extends Express Request, so we can't instantiate it directly
    // But we can verify its structure by checking it compiles
    const authRequest: AuthRequest = {} as AuthRequest;
    expect(authRequest).toBeDefined();
  });

  it('should properly define ApiResponse interface', () => {
    const response: ApiResponse = {
      success: true
    };
    
    expect(response.success).toBeDefined();
  });

  it('should properly define SignupRequest interface', () => {
    const signupRequest: SignupRequest = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword123'
    };
    
    expect(signupRequest.username).toBeDefined();
    expect(signupRequest.email).toBeDefined();
    expect(signupRequest.password).toBeDefined();
  });

  it('should properly define LoginRequest interface', () => {
    const loginRequest: LoginRequest = {
      email: 'test@example.com',
      password: 'testpassword123'
    };
    
    expect(loginRequest.email).toBeDefined();
    expect(loginRequest.password).toBeDefined();
  });

  it('should properly define CreateTodoRequest interface', () => {
    const createTodoRequest: CreateTodoRequest = {
      title: 'Test todo',
      startDate: new Date(),
      dueDate: new Date()
    };
    
    expect(createTodoRequest.title).toBeDefined();
    expect(createTodoRequest.startDate).toBeDefined();
    expect(createTodoRequest.dueDate).toBeDefined();
  });

  it('should properly define UpdateTodoRequest interface', () => {
    const updateTodoRequest: UpdateTodoRequest = {
      title: 'Updated todo',
      description: 'Updated description',
      startDate: new Date(),
      dueDate: new Date()
    };
    
    expect(updateTodoRequest.title).toBeDefined();
  });

  it('should properly define AuthSuccessResponse interface', () => {
    const authResponse: AuthSuccessResponse = {
      success: true,
      data: {
        token: 'test-token',
        user: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          username: 'testuser',
          email: 'test@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    };
    
    expect(authResponse.success).toBe(true);
    expect(authResponse.data?.token).toBeDefined();
    expect(authResponse.data?.user).toBeDefined();
  });

  it('should properly define TodoResponse interface', () => {
    const todoResponse: TodoResponse = {
      success: true,
      data: {
        todo: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: '123e4567-e89b-12d3-a456-426614174000',
          title: 'Test todo',
          description: 'Test description',
          startDate: new Date(),
          dueDate: new Date(),
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    };
    
    expect(todoResponse.success).toBe(true);
    expect(todoResponse.data?.todo).toBeDefined();
  });

  it('should properly define TodoListResponse interface', () => {
    const todoListResponse: TodoListResponse = {
      success: true,
      data: {
        todos: [],
        count: 0
      }
    };
    
    expect(todoListResponse.success).toBe(true);
    expect(todoListResponse.data?.todos).toBeDefined();
    expect(todoListResponse.data?.count).toBeDefined();
  });

  it('should properly define SuccessResponse interface', () => {
    const successResponse: SuccessResponse = {
      success: true,
      message: 'Operation successful'
    };
    
    expect(successResponse.success).toBe(true);
    expect(successResponse.message).toBeDefined();
  });

  it('should properly define ErrorResponse interface', () => {
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: [
          {
            field: 'email',
            message: 'Invalid email format'
          }
        ]
      }
    };
    
    expect(errorResponse.success).toBe(false);
    expect(errorResponse.error).toBeDefined();
    expect(errorResponse.error?.code).toBeDefined();
    expect(errorResponse.error?.message).toBeDefined();
  });

  it('should properly define JWTPayload interface', () => {
    const jwtPayload: JWTPayload = {
      userId: '123e4567-e89b-12d3-a456-426614174000',
      iat: 1234567890,
      exp: 1234567890
    };
    
    expect(jwtPayload.userId).toBeDefined();
    expect(jwtPayload.iat).toBeDefined();
    expect(jwtPayload.exp).toBeDefined();
  });

  it('should properly define PublicTodoResponse interface', () => {
    const publicTodoResponse: PublicTodoResponse = {
      success: true,
      data: {
        publicTodo: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          title: 'National Holiday',
          description: 'Public holiday description',
          eventDate: new Date(),
          type: 'NATIONAL_HOLIDAY',
          createdAt: new Date()
        }
      }
    };
    
    expect(publicTodoResponse.success).toBe(true);
    expect(publicTodoResponse.data?.publicTodo).toBeDefined();
  });
});