/**
 * Environment variable validation and setup
 */

const requiredEnvVars = ['OPENAI_API_KEY'];

function validateEnv() {
  const missing: string[] = [];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  });

  if (missing.length > 0) {
    console.warn(
      `Warning: Missing environment variables: ${missing.join(', ')}\n` +
        'Please add them to .env.local for full functionality.'
    );
  }
}

export const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

if (process.env.NODE_ENV !== 'production') {
  validateEnv();
}
