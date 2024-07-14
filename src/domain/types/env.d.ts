declare namespace NodeJS {
  interface ProcessEnv {
    API_PORT: string;
    DATABASE_SOURCE: string;
    JWT_SECRET: string;
    NODE_ENV: "development" | "production";
  }
}
