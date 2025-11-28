# cwh-todolist Backend

Backend API server for the cwh-todolist application built with Express.js, TypeScript, and Prisma ORM.

## Features

- JWT-based authentication
- Todo CRUD operations
- Input validation
- Error handling
- Health check endpoint
- Logging
- RESTful API design

## Tech Stack

- Node.js v20 LTS
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT)
- Bcrypt for password hashing
- Winston for logging

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication, validation, error handling
│   ├── routes/          # API route definitions
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions and database service
│   ├── app.ts           # Express app configuration
│   └── server.ts        # Server entry point
├── prisma/              # Prisma schema and migrations
├── dist/                # Compiled JavaScript files
├── package.json
├── tsconfig.json
└── vercel.json          # Vercel deployment configuration
```

## Getting Started

### Prerequisites

- Node.js v20 LTS
- PostgreSQL database
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cwh-todolist/backend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Set up the database:
   ```bash
   # Run Prisma migrations
   npx prisma migrate dev
   # Generate Prisma client
   npx prisma generate
   ```

5. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/cwh_todolist"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="24h"
NODE_ENV="development"
PORT=3000
LOG_LEVEL="info"
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - User login

### Todos

- `GET /api/todos` - Get user's todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Health Check

- `GET /api/health` - Server health check

## Scripts

- `pnpm start` - Start the production server
- `pnpm dev` - Start the development server with hot reload
- `pnpm build` - Compile TypeScript to JavaScript
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report

## Testing

The project uses Jest for testing. To run tests:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Deployment

The project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.

To deploy:

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## Error Handling

The API follows a consistent error response format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": [...]
  }
}
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens with expiration
- Input validation using express-validator
- Protection against SQL injection via Prisma ORM
- CORS configured for security

## API Documentation

API documentation is available in `swagger/swagger.json` and follows the OpenAPI 3.0 specification.