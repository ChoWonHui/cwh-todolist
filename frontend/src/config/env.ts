/**
 * Environment Configuration
 *
 * Centralized configuration for environment variables.
 * All environment variables should be accessed through this module.
 */

interface EnvConfig {
  api: {
    url: string;
    timeout: number;
  };
  app: {
    env: string;
    isDevelopment: boolean;
    isProduction: boolean;
  };
  features: {
    enableDebug: boolean;
  };
}

/**
 * Get environment variable with fallback
 */
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  return import.meta.env[key] || defaultValue;
};

/**
 * Application configuration object
 */
export const config: EnvConfig = {
  api: {
    url: getEnvVar('VITE_API_URL', 'http://localhost:3000/api'),
    timeout: parseInt(getEnvVar('VITE_API_TIMEOUT', '10000'), 10),
  },
  app: {
    env: getEnvVar('VITE_APP_ENV', 'development'),
    isDevelopment: getEnvVar('VITE_APP_ENV', 'development') === 'development',
    isProduction: getEnvVar('VITE_APP_ENV', 'development') === 'production',
  },
  features: {
    enableDebug: getEnvVar('VITE_ENABLE_DEBUG', 'true') === 'true',
  },
};

/**
 * Validate required environment variables
 */
export const validateEnv = (): void => {
  const required = ['VITE_API_URL'];
  const missing = required.filter(key => !import.meta.env[key]);

  if (missing.length > 0) {
    console.warn(
      `Missing environment variables: ${missing.join(', ')}. ` +
      'Using default values. Please check your .env file.'
    );
  }
};

// Validate on module load in development
if (config.app.isDevelopment) {
  validateEnv();
}

export default config;
