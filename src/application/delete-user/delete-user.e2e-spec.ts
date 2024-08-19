import { PersonalRefreshToken, User } from "@prisma/client";
import { Response } from "supertest";
import { HttpResponses } from "../../domain/constants/http-responses";
import { CommonTestsUtility } from "../../domain/utilities/common-tests.utility";
import { prisma, request } from "../../main.e2e-spec";

const commonTestsUtility = new CommonTestsUtility("DELETE", "/user");

describe("Delete User | E2E Tests", () => {
  describe("Use Cases", () => {
    commonTestsUtility.includeAuthenticationTest();
    commonTestsUtility.includeRateLimitTest();

    it("Should delete the authenticated user", async () => {
      const { jwtCookie, signUpUserBody } = await commonTestsUtility.authenticate();

      const response: Response = await request.delete("/user").set("Cookie", jwtCookie);

      const user: User | null = await prisma.user.findUnique({
        where: {
          id: signUpUserBody.userId,
          deletedAt: null,
        },
      });

      const personalRefreshTokens: PersonalRefreshToken[] =
        await prisma.personalRefreshToken.findMany({
          where: {
            value: signUpUserBody.refreshToken.value,
            deletedAt: null,
          },
        });

      expect(response.statusCode).toEqual(HttpResponses.NO_CONTENT.status);

      expect(user).toEqual(null);
      expect(personalRefreshTokens).toEqual([]);
    });
  });
});
