"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: "src",
    testEnvironment: "node",
    testRegex: ".*\\.spec\\.ts$",
    transform: { "^.+\\.(t|j)s$": "ts-jest" },
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map