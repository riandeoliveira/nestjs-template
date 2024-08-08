import { PersonalRefreshToken, User } from "@prisma/client";
import { isUUID } from "class-validator";
import each from "jest-each";
import { Response } from "supertest";
import {
  ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
  PROBLEM_DETAILS_URI,
  REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
} from "../../domain/constants";
import { HttpResponses } from "../../domain/constants/http-responses";
import { TokenDto } from "../../domain/dtos/token.dto";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { ProblemDetailsType } from "../../domain/types/problem-details";
import { CommonTestsUtility } from "../../domain/utilities/common-tests.utility";
import { authService, prisma, request } from "../../main.e2e-spec";
import { renewUserRefreshTokenFixture } from "./renew-user-refresh-token.fixture";

const commonTestsUtility = new CommonTestsUtility("POST", "/user/refresh-token/renew");

describe("Renew User Refresh Token | E2E Tests", () => {
  describe("Use Cases", () => {
    commonTestsUtility.includeAuthenticationTest();
    commonTestsUtility.includeRateLimitTest();

    it("Should renew a user refresh token", async () => {
      const { accessToken, signUpUserBody } = await commonTestsUtility.authenticate();

      const response: Response = await request
        .post("/user/refresh-token/renew")
        .set("Authorization", accessToken)
        .send({
          refresh_token: signUpUserBody.refreshToken.value,
        });

      const body: TokenDto = response.body;

      const user: User | null = await prisma.user.findUnique({
        where: {
          id: body.userId,
          deletedAt: null,
        },
      });

      const personalRefreshToken: PersonalRefreshToken | null =
        await prisma.personalRefreshToken.findUnique({
          where: {
            value: body.refreshToken.value,
            deletedAt: null,
          },
        });

      const isAccessTokenValid: boolean = await authService.validateTokenOrThrow(
        body.accessToken.value,
      );

      const isRefreshTokenValid: boolean = await authService.validateTokenOrThrow(
        body.refreshToken.value,
      );

      expect(response.statusCode).toEqual(HttpResponses.OK.status);

      expect(isUUID(body.userId)).toEqual(true);
      expect(user).not.toBeNull();

      expect(body.accessToken.expiresIn).toEqual(ACCESS_TOKEN_EXPIRATION_IN_SECONDS);
      expect(isAccessTokenValid).toEqual(true);

      expect(body.refreshToken.expiresIn).toEqual(REFRESH_TOKEN_EXPIRATION_IN_SECONDS);
      expect(isRefreshTokenValid).toEqual(true);
      expect(personalRefreshToken).not.toBeNull();
    });

    it("should throw an error when the refresh token has already been used", async () => {
      const { accessToken, signUpUserBody } = await commonTestsUtility.authenticate();

      const personalRefreshToken: PersonalRefreshToken = await prisma.personalRefreshToken.update({
        where: {
          value: signUpUserBody.refreshToken.value,
        },
        data: {
          hasBeenUsed: true,
          updatedAt: new Date(),
        },
      });

      const response: Response = await request
        .post("/user/refresh-token/renew")
        .set("Authorization", accessToken)
        .send({
          refresh_token: personalRefreshToken.value,
        });

      const { status, message } = HttpResponses.UNAUTHORIZED;

      const body: ProblemDetailsType = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toContain(ResponseMessages.UNAUTHORIZED_OPERATION);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(message);
    });
  });

  describe("Validations", () => {
    let accessToken: string;

    beforeAll(async () => {
      const { accessToken: token } = await commonTestsUtility.authenticate();

      accessToken = token;
    });

    each(renewUserRefreshTokenFixture).it("$title", async ({ field, value, message }) => {
      const response: Response = await request
        .post("/user/refresh-token/renew")
        .set("Authorization", accessToken)
        .send({
          [field]: value,
        })
        .retry();

      const { status, message: detail } = HttpResponses.BAD_REQUEST;

      const body: ProblemDetailsType = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toContain(message);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(detail);
    });
  });
});
