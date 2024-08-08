import { HttpStatus } from "@nestjs/common";
import { PersonalRefreshToken, User } from "@prisma/client";
import { isUUID } from "class-validator";
import each from "jest-each";
import { Response } from "supertest";
import {
  ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
  PROBLEM_DETAILS_URI,
  REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
} from "../../domain/constants";
import { ProblemDetailsDto } from "../../domain/dtos/problem-details.dto";
import { TokenDto } from "../../domain/dtos/token.dto";
import { HttpMessages } from "../../domain/enums/http-messages.enum";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
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

      expect(response.statusCode).toEqual(HttpStatus.OK);

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

      const status: number = HttpStatus.UNAUTHORIZED;
      const body: ProblemDetailsDto = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toContain(ResponseMessages.UNAUTHORIZED_OPERATION);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(HttpMessages.UNAUTHORIZED);
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

      const status: number = HttpStatus.BAD_REQUEST;
      const body: ProblemDetailsDto = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toContain(message);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(HttpMessages.BAD_REQUEST);
    });
  });
});
