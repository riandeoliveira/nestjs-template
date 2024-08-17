"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.prisma = exports.request = void 0;
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const auth_service_1 = require("./infrastructure/modules/auth/auth.service");
const prisma_service_1 = require("./infrastructure/modules/prisma/prisma.service");
const problem_details_extension_1 = require("./web-api/extensions/problem-details.extension");
const validation_extension_1 = require("./web-api/extensions/validation.extension");
const web_api_module_1 = require("./web-api/web-api.module");
let application;
describe("E2E Testing Setup", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const moduleFixture = yield testing_1.Test.createTestingModule({
            imports: [web_api_module_1.WebApiModule],
        }).compile();
        application = moduleFixture.createNestApplication();
        exports.request = (0, supertest_1.default)(application.getHttpServer());
        exports.prisma = application.get(prisma_service_1.PrismaService);
        exports.authService = yield application.resolve(auth_service_1.AuthService);
        problem_details_extension_1.ProblemDetailsExtension.configureWith(application);
        validation_extension_1.ValidationExtension.configureWith(application);
        yield application.init();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield exports.prisma.$disconnect();
        yield application.close();
    }));
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it("Should be defined", () => {
        expect(application).toBeDefined();
    });
});
//# sourceMappingURL=main.e2e-spec.js.map