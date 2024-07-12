declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URI: string;
    JWT_SECRET: string;
    NODE_ENV: "development" | "production";
  }
}
