import { faker } from "@faker-js/faker";
import { HttpStatus } from "@nestjs/common";
import { Response } from "supertest";
import { MAXIMUM_REQUESTS_ALLOWED_PER_TTL, PROBLEM_DETAILS_URI } from "../../domain/constants";
import { ProblemDetailsDto } from "../../domain/dtos/problem-details.dto";
import { TokenDto } from "../../domain/dtos/token.dto";
import { HttpMessages } from "../../domain/enums/http-messages.enum";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { prisma, request } from "../../main.e2e-spec";

describe("Delete User | E2E Tests", () => {
  describe("Use Cases", () => {
    it("Should delete the authenticated user", async () => {
      const signUpUserResponse: Response = await request.post("/user/sign-up").send({
        email: faker.internet.email(),
        password: faker.internet.password({ prefix: "$0" }),
      });

      const signUpUserBody: TokenDto = signUpUserResponse.body;

      const accessToken: string = `Bearer ${signUpUserBody.accessToken.value}`;

      const response: Response = await request.delete("/user").set("Authorization", accessToken);

      const user = await prisma.user.findUnique({
        where: {
          id: signUpUserBody.userId,
          deletedAt: null,
        },
      });

      const personalRefreshTokenList = await prisma.personalRefreshToken.findMany({
        where: {
          value: signUpUserBody.refreshToken.value,
          deletedAt: null,
        },
      });

      expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);

      expect(user).toEqual(null);
      expect(personalRefreshTokenList).toEqual([]);
    });

    it("Should throw an error when receiving too many requests", async () => {
      const responseList: Response[] = [];

      for (let i = 0; i < MAXIMUM_REQUESTS_ALLOWED_PER_TTL + 1; i++) {
        const response = await request.delete("/user");

        responseList.push(response);
      }

      const status: number = HttpStatus.TOO_MANY_REQUESTS;
      const response = responseList.find((res) => res.statusCode === status) as Response;
      const body: ProblemDetailsDto = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.TOO_MANY_REQUESTS);
      expect(body.status).toEqual(status);
    });

    it("Should throw an error when the authenticated user is not found", async () => {
      const signUpUserResponse: Response = await request.post("/user/sign-up").send({
        email: faker.internet.email(),
        password: faker.internet.password({ prefix: "$0" }),
      });

      const signUpUserBody: TokenDto = signUpUserResponse.body;

      const accessToken: string = `Bearer ${signUpUserBody.accessToken.value}`;

      await request.delete("/user").set("Authorization", accessToken);

      const response: Response = await request.delete("/user").set("Authorization", accessToken);

      const status: number = HttpStatus.NOT_FOUND;
      const body: ProblemDetailsDto = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.USER_NOT_FOUND);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(HttpMessages.NOT_FOUND);
    });

    it("Should throw an error when trying to access without being authenticated", async () => {
      const response: Response = await request.delete("/user");

      const status: number = HttpStatus.UNAUTHORIZED;
      const body: ProblemDetailsDto = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.UNAUTHORIZED_OPERATION);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(HttpMessages.UNAUTHORIZED);
    });
  });
});
