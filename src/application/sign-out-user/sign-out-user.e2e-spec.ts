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
      const { jwtCookie, signUpUserBody } = await commonTestsUtility.authenticate();

      const personalRefreshTokenBeforeRequest: PersonalRefreshToken | null =
        await prisma.personalRefreshToken.findUnique({
          where: {
            value: signUpUserBody.refreshToken.value,
          },
        });

      const response: Response = await request
        .post("/user/sign-out")
        .set("Cookie", jwtCookie);

      const personalRefreshTokenAfterRequest: PersonalRefreshToken | null =
        await prisma.personalRefreshToken.findUnique({
          where: {
            value: signUpUserBody.refreshToken.value,
          },
        });

      expect(response.status).toEqual(HttpResponses.NO_CONTENT.status);

      expect(personalRefreshTokenBeforeRequest?.hasBeenUsed).toEqual(false);
      expect(personalRefreshTokenAfterRequest?.hasBeenUsed).toEqual(true);
    });
  });
});
