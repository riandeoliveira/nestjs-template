export const EnvironmentVariables = {
  API_PORT: process.env.API_PORT,

  CLIENT_URL: process.env.CLIENT_URL,

  DATABASE_URL: process.env.DATABASE_URL,

  JWT_SECRET: process.env.JWT_SECRET,

  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_SENDER: process.env.MAIL_SENDER,
  MAIL_USERNAME: process.env.MAIL_USERNAME,

  NODE_ENV: process.env.NODE_ENV,

  PORT: process.env.PORT,
} as const;
