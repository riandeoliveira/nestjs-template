import { PersonalRefreshToken, User } from "@prisma/client";
import { Response } from "supertest";
import { HttpResponses } from "../../domain/constants/http-responses";
import { TestsUtility } from "../../domain/utilities/tests.utility";
import { authService, prisma, request } from "../../main.e2e-spec";

const testsUtility = new TestsUtility({
  method: "DELETE",
  path: "/user",
});

describe("Delete User | E2E Tests", () => {
  describe("Use Cases", () => {
    testsUtility.includeAuthenticationTest();
    testsUtility.includeRateLimitTest();

    it("Should delete the authenticated user", async () => {
      const { jwtCookies } = await testsUtility.authenticate();

      const accessToken: string = testsUtility.getAccessTokenFromCookies(jwtCookies);
      const refreshToken: string = testsUtility.getRefreshTokenFromCookies(jwtCookies);

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
