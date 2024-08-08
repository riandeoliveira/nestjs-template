import { Response } from "supertest";
import { HttpResponses } from "../../domain/constants/http-responses";
import { CommonTestsUtility } from "../../domain/utilities/common-tests.utility";
import { request } from "../../main.e2e-spec";

const commonTestsUtility = new CommonTestsUtility("GET", "/user/verify");

describe("Verify Current User | E2E Tests", () => {
  describe("Use Cases", () => {
    commonTestsUtility.includeAuthenticationTest();
    commonTestsUtility.includeRateLimitTest();

    it("Should verify the authenticated user", async () => {
      const { accessToken } = await commonTestsUtility.authenticate();

      const response: Response = await request
        .get("/user/verify")
        .set("Authorization", accessToken);

      expect(response.statusCode).toEqual(HttpResponses.NO_CONTENT.status);
    });
  });
});
