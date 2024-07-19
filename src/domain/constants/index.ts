export const ACCESS_TOKEN_EXPIRATION_IN_SECONDS: number = 3600; // 1 hour

export const MAXIMUM_REQUESTS_ALLOWED_PER_TTL: number = process.env.NODE_ENV === "test" ? 10 : 100;

export const PROBLEM_DETAILS_URI: string = "https://httpstatuses.com";

export const REFRESH_TOKEN_EXPIRATION_IN_SECONDS: number = 604800; // 7 days

export const TIME_TO_LIVE_IN_SECONDS: number = process.env.NODE_ENV === "test" ? 1000 : 60000;
