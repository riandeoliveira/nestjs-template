declare namespace NodeJS {
  interface ProcessEnv {
    API_PORT: string;

    CLIENT_URL: string;

    DATABASE_URL: string;

    NODE_ENV: "development" | "production" | "test";

    JWT_SECRET: string;

    MAIL_HOST: string;
    MAIL_PASSWORD: string;
    MAIL_SENDER: string;
    MAIL_USERNAME: string;
  }
}
