import { PersonalRefreshToken } from "@prisma/client";
import { Response } from "supertest";
import { E2EResponseHelper } from "../../infrastructure/helpers/e2e-response.helper";
import { E2ETestsHelper } from "../../infrastructure/helpers/e2e-tests.helper";
import { CookiesUtility } from "../../infrastructure/utilities/cookies.utility";
import { prisma, request } from "../../main.e2e-spec";

const { includeAuthenticationTest, includeRateLimitTest, authenticate } = new E2ETestsHelper(
  "POST",
  "/user/sign-out",
);

describe("Sign Out User | E2E Tests", () => {
  describe("Use Cases", () => {
    includeAuthenticationTest();
    includeRateLimitTest();

    it("Should sign out a user", async () => {
      const { jwtCookies } = await authenticate();

      const refreshToken: string = CookiesUtility.getJwtTokenFromCookies(
        jwtCookies,
        "refresh_token",
      );

      const response: Response = await request.post("/user/sign-out").set("Cookie", jwtCookies);

      const { expectCorrectStatusCode, expectEmptyJwtCookies } = new E2EResponseHelper(
        response,
        "NO_CONTENT",
      );

      const personalRefreshTokenAfterRequest: PersonalRefreshToken | null =
        await prisma.personalRefreshToken.findUnique({
          where: {
            value: refreshToken,
            deletedAt: null,
          },
        });

      expectCorrectStatusCode();

      expect(personalRefreshTokenAfterRequest?.hasBeenUsed).toEqual(true);

      expectEmptyJwtCookies();
    });
  });
});
