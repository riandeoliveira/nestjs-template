import { PersonalRefreshToken, User } from "@prisma/client";
import { Response } from "supertest";
import { HttpResponses } from "../../domain/constants/http-responses";
import { CommonTestsUtility } from "../../domain/utilities/common-tests.utility";
import { authService, prisma, request } from "../../main.e2e-spec";

const commonTestsUtility = new CommonTestsUtility("DELETE", "/user");

describe("Delete User | E2E Tests", () => {
  describe("Use Cases", () => {
    commonTestsUtility.includeAuthenticationTest();
    commonTestsUtility.includeRateLimitTest();

    it("Should delete the authenticated user", async () => {
      const { jwtCookies } = await commonTestsUtility.authenticate();

      const accessToken: string = commonTestsUtility.getJwtTokenFromCookie(jwtCookies[0]);
      const refreshToken: string = commonTestsUtility.getJwtTokenFromCookie(jwtCookies[1]);

      const { userId } = await authService.validateTokenOrThrow(accessToken);

      const response: Response = await request.delete("/user").set("Cookie", jwtCookies);

      const user: User | null = await prisma.user.findUnique({
        where: {
          id: userId,
          deletedAt: null,
        },
      });

      const personalRefreshTokens: PersonalRefreshToken[] =
        await prisma.personalRefreshToken.findMany({
          where: {
            value: refreshToken,
            deletedAt: null,
          },
        });

      expect(response.statusCode).toEqual(HttpResponses.NO_CONTENT.status);

      expect(user).toEqual(null);
      expect(personalRefreshTokens).toEqual([]);
    });
  });
});
