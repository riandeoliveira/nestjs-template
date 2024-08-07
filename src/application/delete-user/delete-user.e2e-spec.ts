import { HttpStatus } from "@nestjs/common";
import { Response } from "supertest";
import { CommonTestsUtility } from "../../domain/utilities/common-tests.utility";
import { prisma, request } from "../../main.e2e-spec";

const commonTestsUtility = new CommonTestsUtility("DELETE", "/user");

describe("Delete User | E2E Tests", () => {
  describe("Use Cases", () => {
    commonTestsUtility.includeAuthenticationTest();
    commonTestsUtility.includeRateLimitTest();

    it("Should delete the authenticated user", async () => {
      const { accessToken, signUpUserBody } = await commonTestsUtility.authenticate();

      const response: Response = await request.delete("/user").set("Authorization", accessToken);

      const user = await prisma.user.findUnique({
        where: {
          id: signUpUserBody.userId,
          deletedAt: null,
        },
      });

      const personalRefreshTokens = await prisma.personalRefreshToken.findMany({
        where: {
          value: signUpUserBody.refreshToken.value,
          deletedAt: null,
        },
      });

      expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);

      expect(user).toEqual(null);
      expect(personalRefreshTokens).toEqual([]);
    });
  });
});
