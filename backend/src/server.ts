import app, { PORT } from './app';

// Only start server if running directly (not imported for testing)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;