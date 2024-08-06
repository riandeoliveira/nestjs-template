import { HttpStatus } from "@nestjs/common";
import { Response } from "supertest";
import { TestUtility } from "../../domain/utilities/test.utility";
import { request } from "../../main.e2e-spec";

const utility = new TestUtility("GET", "/user/verify");

describe("Verify Current User | E2E Tests", () => {
  describe("Use Cases", () => {
    utility.includeAuthenticationTest();
    utility.includeRateLimitTest();

    it("Should verify the authenticated user", async () => {
      const { accessToken } = await utility.authenticate();

      const response: Response = await request
        .get("/user/verify")
        .set("Authorization", accessToken);

      expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
    });
  });
});
