import request from 'supertest';
import app from '../../dist/app'; // Import the compiled version

describe('App', () => {
  it('should respond with welcome message on root route', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Welcome to cwh-todolist API'
    });
  });

  it('should respond with 404 for non-existent routes', async () => {
    const response = await request(app).get('/non-existent-route');
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Route not found'
      }
    });
  });
});