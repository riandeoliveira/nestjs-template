import each from "jest-each";
import { Response } from "supertest";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { E2EResponseHelper } from "../../infrastructure/helpers/e2e-response.helper";
import { E2ETestsHelper } from "../../infrastructure/helpers/e2e-tests.helper";
import { request } from "../../main.e2e-spec";
import { signInUserFixture } from "./sign-in-user.fixture";

const { includeRateLimitTest } = new E2ETestsHelper("POST", "/user/sign-in");

describe("Sign In User | E2E Tests", () => {
  describe("Use Cases", () => {
    includeRateLimitTest();

    it("Should sign in a user", async () => {
      const email: string = FakeData.email();
      const password: string = FakeData.strongPassword();

      await request.post("/user/sign-up").send({
        email,
        password,
      });

      const response: Response = await request.post("/user/sign-in").send({
        email,
        password,
      });

      const { expectCorrectStatusCode, expectValidJwtTokens } = new E2EResponseHelper(
        response,
        "NO_CONTENT",
      );

      expectCorrectStatusCode();
      expectValidJwtTokens();
    });

    it("Should throw an error when sending invalid credentials", async () => {
      const response: Response = await request.post("/user/sign-in").send({
        email: FakeData.email(),
        password: FakeData.strongPassword(),
      });

      const { expectCorrectStatusCode, expectProblemDetails } = new E2EResponseHelper(
        response,
        "UNAUTHORIZED",
      );

      expectCorrectStatusCode();
      expectProblemDetails("INVALID_CREDENTIALS");
    });
  });

  describe("Validations", () => {
    each(signInUserFixture).it("$title", async ({ field, value, message }) => {
      const response: Response = await request
        .post("/user/sign-in")
        .send({
          [field]: value,
        })
        .retry();

      const { expectCorrectStatusCode, expectProblemDetails } = new E2EResponseHelper(
        response,
        "BAD_REQUEST",
      );

      expectCorrectStatusCode();
      expectProblemDetails(message);
    });
  });
});
