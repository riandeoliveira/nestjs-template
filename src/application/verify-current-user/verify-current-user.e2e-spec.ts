import { Response } from "supertest";
import { HttpResponses } from "../../domain/constants/http-responses";
import { TestsUtility } from "../../domain/utilities/tests.utility";
import { request } from "../../main.e2e-spec";

const testsUtility = new TestsUtility({
  method: "GET",
  path: "/user/verify",
});

describe("Verify Current User | E2E Tests", () => {
  describe("Use Cases", () => {
    testsUtility.includeAuthenticationTest();
    testsUtility.includeRateLimitTest();

    it("Should verify the authenticated user", async () => {
      const { jwtCookies } = await testsUtility.authenticate();

      const response: Response = await request.get("/user/verify").set("Cookie", jwtCookies);

      expect(response.statusCode).toEqual(HttpResponses.NO_CONTENT.status);
    });
  });
});
