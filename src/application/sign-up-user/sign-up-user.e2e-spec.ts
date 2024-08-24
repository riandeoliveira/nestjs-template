import each from "jest-each";
import { Response } from "supertest";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { E2EResponseHelper } from "../../infrastructure/helpers/e2e-response.helper";
import { E2ETestsHelper } from "../../infrastructure/helpers/e2e-tests.helper";
import { request } from "../../main.e2e-spec";
import { signUpUserFixture } from "./sign-up-user.fixture";

const { includeRateLimitTest } = new E2ETestsHelper("POST", "/user/sign-up");

describe("Sign Up User | E2E Tests", () => {
  describe("Use Cases", () => {
    includeRateLimitTest();

    it("Should sign up a user", async () => {
      const response: Response = await request.post("/user/sign-up").send({
        email: FakeData.email(),
        password: FakeData.strongPassword(),
      });

      const { expectCorrectStatusCode, expectValidJwtTokens } = new E2EResponseHelper(
        response,
        "CREATED",
      );

      expectCorrectStatusCode();
      expectValidJwtTokens();
    });

    it("Should throw an error when trying to sign up a user with an already registered email", async () => {
      const email: string = FakeData.email();
      const password: string = FakeData.strongPassword();

      await request.post("/user/sign-up").send({
        email,
        password,
      });

      const response: Response = await request.post("/user/sign-up").send({
        email,
        password,
      });

      const { expectCorrectStatusCode, expectProblemDetails } = new E2EResponseHelper(
        response,
        "CONFLICT",
      );

      expectCorrectStatusCode();
      expectProblemDetails("EMAIL_ALREADY_EXISTS");
    });
  });

  describe("Validations", () => {
    each(signUpUserFixture).it("$title", async ({ field, value, message }) => {
      const response: Response = await request
        .post("/user/sign-up")
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
