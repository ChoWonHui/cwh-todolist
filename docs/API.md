# cwh-todolist API Documentation

## Overview

This document describes the REST API endpoints for the cwh-todolist application.

- Base URL: `https://cwh-todolist.vercel.app/api` (production) or `http://localhost:3000/api` (development)
- Content-Type: `application/json`
- Authentication: JWT Bearer token in Authorization header

## Authentication

Most endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are issued upon successful registration or login and expire after 24 hours.

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": [
      {
        "field": "field_name",
        "message": "Error description for this field"
      }
    ]
  }
}
```

## API Endpoints

### Authentication

#### POST /api/auth/signup

Register a new user account.

##### Request Body
```json
{
  "username": "string (3-20 chars, alphanumeric and underscore only)",
  "email": "string (valid email format)",
  "password": "string (min 8 chars, with uppercase, lowercase, and number)"
}
```

##### Success Response
- Status: `200 OK`
```json
{
  "success": true,
  "data": {
    "token": "JWT token string",
    "user": {
      "id": "user UUID",
      "username": "string",
      "email": "string",
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string"
    }
  }
}
```

##### Error Responses
- `400 Bad Request` - Validation error
- `409 Conflict` - Email or username already exists
- `500 Internal Server Error` - Server error

#### POST /api/auth/login

Authenticate and get a JWT token.

##### Request Body
```json
{
  "email": "string (valid email)",
  "password": "string (min 8 chars)"
}
```

##### Success Response
- Status: `200 OK`
```json
{
  "success": true,
  "data": {
    "token": "JWT token string",
    "user": {
      "id": "user UUID",
      "username": "string",
      "email": "string",
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string"
    }
  }
}
```

##### Error Responses
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Invalid credentials
- `500 Internal Server Error` - Server error

### Todos

#### GET /api/todos

Get the authenticated user's active todos.

##### Headers
```
Authorization: Bearer <token>
```

##### Query Parameters (optional)
- `startDate`: Filter todos with start date on or after this date (ISO 8601 format)
- `endDate`: Filter todos with due date on or before this date (ISO 8601 format)  
- `sort`: Sort by 'createdAt' or 'dueDate' (default: 'createdAt')

##### Success Response
- Status: `200 OK`
```json
{
  "success": true,
  "data": {
    "todos": [
      {
        "id": "todo UUID",
        "userId": "user UUID",
        "title": "string",
        "description": "string or null",
        "startDate": "ISO date string",
        "dueDate": "ISO date string",
        "status": "ACTIVE",
        "createdAt": "ISO date string",
        "updatedAt": "ISO date string"
      }
    ],
    "count": number
  }
}
```

##### Error Responses
- `401 Unauthorized` - Invalid or missing token
- `500 Internal Server Error` - Server error

#### POST /api/todos

Create a new todo.

##### Headers
```
Authorization: Bearer <token>
```

##### Request Body
```json
{
  "title": "string (1-100 chars, required)",
  "description": "string (0-1000 chars, optional)",
  "startDate": "ISO date string (required)",
  "dueDate": "ISO date string (required, must be after startDate)"
}
```

##### Success Response
- Status: `201 Created`
```json
{
  "success": true,
  "data": {
    "todo": {
      "id": "todo UUID",
      "userId": "user UUID",
      "title": "string",
      "description": "string or null",
      "startDate": "ISO date string",
      "dueDate": "ISO date string",
      "status": "ACTIVE",
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string"
    }
  }
}
```

##### Error Responses
- `400 Bad Request` - Validation error or due date before start date
- `401 Unauthorized` - Invalid or missing token
- `500 Internal Server Error` - Server error

#### PUT /api/todos/:id

Update an existing todo.

##### Path Parameters
- `id`: Todo UUID

##### Headers
```
Authorization: Bearer <token>
```

##### Request Body
```json
{
  "title": "string (1-100 chars, optional)",
  "description": "string (0-1000 chars, optional)",
  "startDate": "ISO date string (optional)",
  "dueDate": "ISO date string (optional, if provided must be after startDate)"
}
```

##### Success Response
- Status: `200 OK`
```json
{
  "success": true,
  "data": {
    "todo": {
      "id": "todo UUID",
      "userId": "user UUID",
      "title": "string",
      "description": "string or null",
      "startDate": "ISO date string",
      "dueDate": "ISO date string",
      "status": "ACTIVE", 
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string"
    }
  }
}
```

##### Error Responses
- `400 Bad Request` - Validation error or due date before start date
- `401 Unauthorized` - Invalid or missing token
- `404 Not Found` - Todo doesn't exist or doesn't belong to user
- `500 Internal Server Error` - Server error

#### DELETE /api/todos/:id

Delete a todo permanently.

##### Path Parameters
- `id`: Todo UUID

##### Headers
```
Authorization: Bearer <token>
```

##### Success Response
- Status: `200 OK`
```json
{
  "success": true,
  "message": "할일이 삭제되었습니다"
}
```

##### Error Responses
- `401 Unauthorized` - Invalid or missing token
- `404 Not Found` - Todo doesn't exist or doesn't belong to user
- `500 Internal Server Error` - Server error

### Health Check

#### GET /api/health

Check server health status.

##### Success Response
- Status: `200 OK`
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "ISO date string",
    "uptime": number (seconds),
    "environment": "string",
    "version": "string"
  }
}
```

## Error Codes

- `VALIDATION_ERROR`: Input validation failed
- `UNAUTHORIZED`: Authentication required or token invalid
- `FORBIDDEN`: Access to resource is forbidden
- `NOT_FOUND`: Requested resource not found
- `CONFLICT`: Resource conflict (e.g. duplicate email)
- `INTERNAL_ERROR`: Server error
- `TOKEN_EXPIRED`: JWT token has expired
- `INVALID_TOKEN`: JWT token format is invalid

## Rate Limiting

The API doesn't implement rate limiting in this version. Consider implementing rate limiting in production deployments.

## Date Format

All date/time values are in ISO 8601 format (e.g. "2025-11-25T14:30:00.000Z").