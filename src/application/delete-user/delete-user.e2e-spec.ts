import { PersonalRefreshToken, User } from "@prisma/client";
import { Response } from "supertest";
import { E2EResponseHelper } from "../../infrastructure/helpers/e2e-response.helper";
import { E2ETestsHelper } from "../../infrastructure/helpers/e2e-tests.helper";
import { CookiesUtility } from "../../infrastructure/utilities/cookies.utility";
import { authService, prisma, request } from "../../main.e2e-spec";

const { includeAuthenticationTest, includeRateLimitTest, authenticate } = new E2ETestsHelper(
  "DELETE",
  "/user",
);

describe("Delete User | E2E Tests", () => {
  describe("Use Cases", () => {
    includeAuthenticationTest();
    includeRateLimitTest();

    it("Should delete the authenticated user", async () => {
      const { jwtCookies } = await authenticate();

      const accessToken: string = CookiesUtility.getJwtTokenFromCookies(jwtCookies, "access_token");

      const response: Response = await request.delete("/user").set("Cookie", jwtCookies);

      const { expectCorrectStatusCode, expectEmptyJwtCookies } = new E2EResponseHelper(
        response,
        "NO_CONTENT",
      );

      const { userId } = await authService.validateTokenOrThrow(accessToken);

      const user: User | null = await prisma.user.findUnique({
        where: {
          id: userId,
          deletedAt: null,
        },
      });

      const personalRefreshTokens: PersonalRefreshToken[] =
        await prisma.personalRefreshToken.findMany({
          where: {
            userId,
            deletedAt: null,
          },
        });

      expectCorrectStatusCode();

      expect(user).toEqual(null);
      expect(personalRefreshTokens).toEqual([]);

      expectEmptyJwtCookies();
    });
  });
});
