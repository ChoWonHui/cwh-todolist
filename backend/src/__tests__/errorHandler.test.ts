import request from 'supertest';
import express, { Request, Response } from 'express';
import { errorHandler } from '../../dist/middleware/errorHandler';

// Create a test app with the error handler
const testApp = express();
testApp.use((req: Request, res: Response, next) => {
  // Middleware to force an error for testing
  if (req.path === '/error') {
    const error = new Error('Test error');
    (error as any).status = 500;
    next(error);
  } else if (req.path === '/validation-error') {
    const error = new Error('Validation error');
    (error as any).status = 400;
    next(error);
  } else {
    // Return 200 for normal routes so we can test error handler separately
    res.status(200).json({ message: 'OK' });
  }
});
testApp.use(errorHandler);

describe('Error Handler Middleware', () => {
  it('should handle 500 errors correctly', async () => {
    const response = await request(testApp)
      .get('/error')
      .set('Accept', 'application/json');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: process.env.NODE_ENV === 'development' ? 'Test error' : 'An error occurred'
      }
    });
  });

  it('should handle validation errors correctly', async () => {
    const response = await request(testApp)
      .get('/validation-error')
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      error: {
        code: 'ERROR',
        message: process.env.NODE_ENV === 'development' ? 'Validation error' : 'An error occurred'
      }
    });
  });
});