import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ProblemDetailsExtension } from "../src/web-api/extensions/problem-details.extension";
import { ValidationExtension } from "../src/web-api/extensions/validation.extension";
import { WebApiModule } from "../src/web-api/web-api.module";

class ApplicationTestBuilder {
  public application: INestApplication;

  public async start(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WebApiModule],
    }).compile();

    this.application = moduleFixture.createNestApplication();

    ProblemDetailsExtension.configureWith(this.application);
    ValidationExtension.configureWith(this.application);

    await this.application.init();

    return this.application;
  }

  public async stop(): Promise<void> {
    await this.application.close();
  }
}

export const applicationTestBuilder = new ApplicationTestBuilder();
