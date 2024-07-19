import { HttpStatus } from "@nestjs/common";
import { Response } from "supertest";
import { TestUtility } from "../../domain/utilities/test.utility";
import { prisma, request } from "../../main.e2e-spec";

const utility = new TestUtility("DELETE", "/user");

describe("Delete User | E2E Tests", () => {
  describe("Use Cases", () => {
    utility.includeAuthenticatedUserTest();
    utility.includeAuthenticationTest();
    utility.includeRateLimitTest();

    it("Should delete the authenticated user", async () => {
      const { accessToken, signUpUserBody } = await utility.authenticate();

      const response: Response = await request.delete("/user").set("Authorization", accessToken);

      const user = await prisma.user.findUnique({
        where: {
          id: signUpUserBody.userId,
          deletedAt: null,
        },
      });

      const personalRefreshTokenList = await prisma.personalRefreshToken.findMany({
        where: {
          value: signUpUserBody.refreshToken.value,
          deletedAt: null,
        },
      });

      expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);

      expect(user).toEqual(null);
      expect(personalRefreshTokenList).toEqual([]);
    });
  });
});
