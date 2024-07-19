declare namespace NodeJS {
  interface ProcessEnv {
    API_PORT: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
