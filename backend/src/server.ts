import app, { PORT } from './app';
import logger from './utils/logger';

// Only start server if running directly (not imported for testing)
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`Health check available at: http://localhost:${PORT}/api/health`);
  });
}

export default app;