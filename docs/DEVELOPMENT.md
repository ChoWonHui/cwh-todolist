# Development Guide

This document provides guidelines and best practices for developing the cwh-todolist backend application.

## Project Setup

### Prerequisites

- Node.js v20 LTS
- PostgreSQL database
- pnpm package manager (recommended) or npm/yarn

### Initial Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cwh-todolist/backend
   ```

2. Install dependencies:
   ```bash
   pnpm install
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

## Development Workflow

### Code Structure

The application follows a modular structure:

- `src/controllers/` - Request handling logic
- `src/middleware/` - Authentication, validation, and other middleware
- `src/routes/` - API route definitions
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions and database service
- `src/__tests__/` - Test files

### Adding New Features

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Write tests first (TDD approach)

3. Implement the feature

4. Run tests to ensure everything works:
   ```bash
   pnpm test
   ```

5. Update documentation if needed

6. Commit changes with descriptive commit messages

### API Design Guidelines

- Follow RESTful principles
- Use consistent naming conventions
- Return appropriate HTTP status codes
- Implement proper error handling
- Document all endpoints
- Validate all inputs

### Error Handling

- Use the centralized error response format
- Log errors appropriately using Winston logger
- Return user-friendly error messages
- Don't expose internal system information in error responses

### Security Best Practices

- Always validate and sanitize input
- Use parameterized queries via Prisma to prevent SQL injection
- Hash passwords using bcrypt
- Implement proper authentication checks
- Use JWT tokens with appropriate expiration
- Sanitize data before sending to clients

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Structure

Tests are located in `src/__tests__/` and follow these patterns:

- Name test files with `.test.ts` extension
- Use Jest for testing framework
- Use Supertest for API testing
- Mock external dependencies when appropriate
- Aim for high test coverage (80%+)

### Writing Tests

- Test all API endpoints
- Test validation logic
- Test error scenarios
- Use realistic test data
- Mock external services like databases

## Code Quality

### Linting and Formatting

The project uses ESLint and Prettier for code quality:

```bash
# Check for linting errors
pnpm lint

# Auto-fix linting errors where possible
pnpm lint:fix

# Format code with Prettier
pnpm format
```

### Type Safety

- Use TypeScript for type safety
- Define interfaces for all data structures
- Use strict mode in TypeScript configuration
- Avoid using `any` type unless absolutely necessary

## Database Management

### Prisma ORM

- Use Prisma for database operations
- Define schema in `prisma/schema.prisma`
- Create migrations for schema changes
- Use Prisma client for database queries

### Migration Process

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply pending migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

## Environment Configuration

### Environment Variables

Required environment variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/cwh_todolist"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="24h"
NODE_ENV="development"
PORT=3000
LOG_LEVEL="info"
```

### Environment-Specific Configurations

- Development: Detailed logging, error stack traces
- Production: Minimal logging, security-focused

## Deployment

### Local Development

```bash
# Start development server with hot reload
pnpm dev
```

### Production Build

```bash
# Compile TypeScript
pnpm build

# Start production server
pnpm start
```

### Vercel Deployment

The project is configured for Vercel deployment:

1. Set environment variables in Vercel dashboard
2. Connect your GitHub repository
3. Deploy automatically on push to main branch

## Logging

### Log Levels

- `error`: System errors and exceptions
- `warn`: Warning messages
- `info`: General information (user registrations, logins)
- `debug`: Detailed debug information (only in development)

### Log Structure

All logs follow the Winston format with timestamp, level, and message.

## Performance Considerations

- Use database indexes appropriately
- Implement pagination for large datasets
- Cache frequently accessed data when appropriate
- Use efficient database queries
- Optimize API responses to avoid over-fetching

## Code Review Checklist

Before merging pull requests:

- [ ] Code follows established patterns
- [ ] Tests are updated or added
- [ ] Documentation is updated
- [ ] Error handling is implemented
- [ ] Security considerations are addressed
- [ ] Code is properly commented where necessary
- [ ] No sensitive information is exposed
- [ ] Performance implications are considered

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify DATABASE_URL in .env file
   - Ensure PostgreSQL is running
   - Check if migrations have been applied

2. **JWT Authentication Errors**
   - Verify JWT_SECRET is set correctly
   - Check token expiration

3. **TypeScript Compilation Errors**
   - Run `pnpm build` to see full error messages
   - Check for missing type definitions

### Debugging Tips

- Use `console.log` or Winston logger for debugging
- Check server logs for error details
- Use Postman or similar tools to test API endpoints directly
- Enable debug logging in development environment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Implement the feature
5. Update documentation
6. Submit a pull request