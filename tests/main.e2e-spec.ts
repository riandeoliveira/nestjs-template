import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import path from "path";
import { Client } from "pg";
import { ProblemDetailsExtension } from "../src/web-api/extensions/problem-details.extension";
import { ValidationExtension } from "../src/web-api/extensions/validation.extension";
import { WebApiModule } from "../src/web-api/web-api.module";

export let application: INestApplication;
export let client: Client;
export let container: StartedPostgreSqlContainer;

describe("E2E Tests", () => {
  beforeAll(async () => {
    // Database setup

    container = await new PostgreSqlContainer().start();

    client = new Client({
      host: container.getHost(),
      port: container.getPort(),
      user: container.getUsername(),
      password: container.getPassword(),
      database: container.getDatabase(),
    });

    await client.connect();

    // Application setup

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "postgres",
          url: container.getConnectionUri(),
          autoLoadEntities: true,
          synchronize: true,
          entities: [path.join(__dirname, "/../src/domain/entities/**.entity{.ts,.js}")],
        }),
        WebApiModule,
      ],
    }).compile();

    application = moduleFixture.createNestApplication();

    ProblemDetailsExtension.configureWith(application);
    ValidationExtension.configureWith(application);

    await application.init();
  }, 30000);

  afterAll(async () => {
    await client.end();
    await container.stop();
    await application.close();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should be defined", () => {
    expect(application).toBeDefined();
  });
});
