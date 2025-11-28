import winston from 'winston';

// Create a logger instance with multiple transports
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    // Format the log output with timestamp, level, and message
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'cwh-todolist-api' },
  transports: [
    // Write to file if in production, otherwise just to console
    ...(process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
          }),
          new winston.transports.File({ 
            filename: 'logs/combined.log',
            maxsize: 5242880, // 5MB
            maxFiles: 5
          })
        ]
      : []),
    
    // Always write to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

export default logger;