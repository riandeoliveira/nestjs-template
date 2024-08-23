import { PersonalRefreshToken } from "@prisma/client";
import { Response } from "supertest";
import { HttpResponses } from "../../domain/constants/http-responses";
import { TestsUtility } from "../../domain/utilities/tests.utility";
import { prisma, request } from "../../main.e2e-spec";

const testsUtility = new TestsUtility({
  method: "POST",
  path: "/user/sign-out",
});

describe("Sign Out User | E2E Tests", () => {
  describe("Use Cases", () => {
    testsUtility.includeAuthenticationTest();
    testsUtility.includeRateLimitTest();

    it("Should sign out a user", async () => {
      const { jwtCookies } = await testsUtility.authenticate();

      const refreshToken: string = testsUtility.getRefreshTokenFromCookies(jwtCookies);

      const personalRefreshTokenBeforeRequest: PersonalRefreshToken | null =
        await prisma.personalRefreshToken.findUnique({
          where: {
            value: refreshToken,
          },
        });

      const response: Response = await request.post("/user/sign-out").set("Cookie", jwtCookies);

      const cookies = response.get("Set-Cookie") as string[];

      const emptyAccessToken: string = testsUtility.getAccessTokenFromCookies(cookies);
      const emptyRefreshToken: string = testsUtility.getRefreshTokenFromCookies(cookies);

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
