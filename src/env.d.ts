declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_SOURCE: string;
    JWT_SECRET: string;
    NODE_ENV: "development" | "production";
  }
}
