import { Response } from "supertest";
import { E2EResponseHelper } from "../../infrastructure/helpers/e2e-response.helper";
import { E2ETestsHelper } from "../../infrastructure/helpers/e2e-tests.helper";
import { request } from "../../main.e2e-spec";

const { includeAuthenticationTest, includeRateLimitTest, authenticate } = new E2ETestsHelper(
  "GET",
  "/user/verify",
);

describe("Verify Current User | E2E Tests", () => {
  describe("Use Cases", () => {
    includeAuthenticationTest();
    includeRateLimitTest();

    it("Should verify the authenticated user", async () => {
      const { jwtCookies } = await authenticate();

      const response: Response = await request.get("/user/verify").set("Cookie", jwtCookies);

      const { expectCorrectStatusCode } = new E2EResponseHelper(response, "NO_CONTENT");

      expectCorrectStatusCode();
    });
  });
});
