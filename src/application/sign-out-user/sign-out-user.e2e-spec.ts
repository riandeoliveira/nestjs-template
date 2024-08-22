import { PersonalRefreshToken } from "@prisma/client";
import { Response } from "supertest";
import { HttpResponses } from "../../domain/constants/http-responses";
import { CommonTestsUtility } from "../../domain/utilities/common-tests.utility";
import { prisma, request } from "../../main.e2e-spec";

const commonTestsUtility = new CommonTestsUtility("POST", "/user/sign-out");

describe("Sign Out User | E2E Tests", () => {
  describe("Use Cases", () => {
    commonTestsUtility.includeAuthenticationTest();
    commonTestsUtility.includeRateLimitTest();

    it("Should sign out a user", async () => {
      const { jwtCookies } = await commonTestsUtility.authenticate();

      const refreshToken: string = commonTestsUtility.getJwtTokenFromCookie(jwtCookies[1]);

      const personalRefreshTokenBeforeRequest: PersonalRefreshToken | null =
        await prisma.personalRefreshToken.findUnique({
          where: {
            value: refreshToken,
          },
        });

      const response: Response = await request.post("/user/sign-out").set("Cookie", jwtCookies);

      const cookies: string[] = commonTestsUtility.getJwtCookies(response);

      const emptyAccessToken: string = commonTestsUtility.getJwtTokenFromCookie(cookies[0]);
      const emptyRefreshToken: string = commonTestsUtility.getJwtTokenFromCookie(cookies[1]);

      const personalRefreshTokenAfterRequest: PersonalRefreshToken | null =
        await prisma.personalRefreshToken.findUnique({
          where: {
            value: refreshToken,
          },
        });

      expect(response.status).toEqual(HttpResponses.NO_CONTENT.status);

      expect(personalRefreshTokenBeforeRequest?.hasBeenUsed).toEqual(false);
      expect(personalRefreshTokenAfterRequest?.hasBeenUsed).toEqual(true);

      expect(emptyAccessToken).toEqual("");
      expect(emptyRefreshToken).toEqual("");
    });
  });
});
