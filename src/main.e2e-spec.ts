import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { default as apiRequest } from "supertest";
import TestAgent from "supertest/lib/agent";
import { AuthService } from "./infrastructure/services/auth.service";
import { PrismaService } from "./infrastructure/services/prisma.service";
import { ProblemDetailsExtension } from "./web-api/extensions/problem-details.extension";
import { ValidationExtension } from "./web-api/extensions/validation.extension";
import { WebApiModule } from "./web-api/web-api.module";

let application: INestApplication;
export let request: TestAgent;
export let prisma: PrismaService;
export let authService: AuthService;

describe("E2E Testing Setup", () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WebApiModule],
    }).compile();

    application = moduleFixture.createNestApplication();

    request = apiRequest(application.getHttpServer());

    prisma = application.get<PrismaService>(PrismaService);

    authService = await application.resolve<AuthService>(AuthService);

    ProblemDetailsExtension.configureWith(application);
    ValidationExtension.configureWith(application);

    await application.init();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await application.close();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should be defined", () => {
    expect(application).toBeDefined();
  });
});
