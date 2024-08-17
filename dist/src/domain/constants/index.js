"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIME_TO_LIVE_IN_SECONDS = exports.REFRESH_TOKEN_EXPIRATION_IN_SECONDS = exports.PROBLEM_DETAILS_URI = exports.MAXIMUM_REQUESTS_ALLOWED_PER_TTL = exports.ACCESS_TOKEN_EXPIRATION_IN_SECONDS = void 0;
exports.ACCESS_TOKEN_EXPIRATION_IN_SECONDS = 600;
exports.MAXIMUM_REQUESTS_ALLOWED_PER_TTL = process.env.NODE_ENV === "test" ? 10 : 100;
exports.PROBLEM_DETAILS_URI = "https://httpstatuses.com";
exports.REFRESH_TOKEN_EXPIRATION_IN_SECONDS = 86400;
exports.TIME_TO_LIVE_IN_SECONDS = process.env.NODE_ENV === "test" ? 1000 : 60000;
//# sourceMappingURL=index.js.map