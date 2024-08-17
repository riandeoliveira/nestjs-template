declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_URL: string;

    DATABASE_URL: string;

    JWT_SECRET: string;

    MAIL_HOST: string;
    MAIL_PASSWORD: string;
    MAIL_SENDER: string;
    MAIL_USERNAME: string;

    NODE_ENV: "development" | "production" | "test";

    PORT: string;
  }
}
