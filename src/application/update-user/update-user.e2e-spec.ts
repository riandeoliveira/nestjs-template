import { faker } from "@faker-js/faker";
import { HttpStatus } from "@nestjs/common";
import each from "jest-each";
import { Response } from "supertest";
import { MAXIMUM_REQUESTS_ALLOWED_PER_TTL, PROBLEM_DETAILS_URI } from "../../domain/constants";
import { ProblemDetailsDto } from "../../domain/dtos/problem-details.dto";
import { TokenDto } from "../../domain/dtos/token.dto";
import { HttpMessages } from "../../domain/enums/http-messages.enum";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { TestUtility } from "../../domain/utilities/test.utility";
import { prisma, request } from "../../main.e2e-spec";
import { updateUserFixture } from "./update-user.fixture";

describe("Update User | E2E Tests", () => {
  describe("Use Cases", () => {
    it("Should throw an error when receiving too many requests", async () => {
      const responseList: Response[] = [];

      for (let i = 0; i < MAXIMUM_REQUESTS_ALLOWED_PER_TTL + 1; i++) {
        const response: Response = await request.put("/user").send({});

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
  });

  it("Should throw an error when the authenticated user is not found", async () => {
    const { accessToken } = await TestUtility.authenticate();

    await request.delete("/user").set("Authorization", accessToken);

    const response: Response = await request.put("/user").set("Authorization", accessToken).send({
      email: faker.internet.email(),
    });

    const status: number = HttpStatus.NOT_FOUND;
    const body: ProblemDetailsDto = response.body;

    expect(response.statusCode).toEqual(status);

    expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
    expect(body.title).toEqual(ResponseMessages.USER_NOT_FOUND);
    expect(body.status).toEqual(status);
    expect(body.detail).toEqual(HttpMessages.NOT_FOUND);
  });

  it("Should throw an error when trying to access without being authenticated", async () => {
    const response: Response = await request.put("/user").send({});

    const status: number = HttpStatus.UNAUTHORIZED;
    const body: ProblemDetailsDto = response.body;

    expect(response.statusCode).toEqual(status);

    expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
    expect(body.title).toEqual(ResponseMessages.UNAUTHORIZED_OPERATION);
    expect(body.status).toEqual(status);
    expect(body.detail).toEqual(HttpMessages.UNAUTHORIZED);
  });

  it("Should throw an error when user email is already being used", async () => {
    const firstUserEmail: string = faker.internet.email();

    await request.post("/user/sign-up").send({
      email: firstUserEmail,
      password: faker.internet.password({ prefix: "$0" }),
    });

    const { accessToken } = await TestUtility.authenticate();

    const response: Response = await request.put("/user").set("Authorization", accessToken).send({
      email: firstUserEmail,
    });

    const status: number = HttpStatus.CONFLICT;
    const body: ProblemDetailsDto = response.body;

    expect(response.statusCode).toEqual(status);

    expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
    expect(body.title).toEqual(ResponseMessages.EMAIL_ALREADY_EXISTS);
    expect(body.status).toEqual(status);
    expect(body.detail).toEqual(HttpMessages.CONFLICT);
  });

  it("Should update a user", async () => {
    const { accessToken, signUpUserBody, email, password } = await TestUtility.authenticate();

    const response: Response = await request
      .put("/user")
      .set("Authorization", accessToken)
      .send({
        email: faker.internet.email(),
        password: faker.internet.password({ prefix: "$0" }),
      });

    const user = await prisma.user.findUnique({
      where: {
        id: signUpUserBody.userId,
        deletedAt: null,
      },
    });

    const personalRefreshToken = await prisma.personalRefreshToken.findFirst({
      where: {
        userId: user?.id,
        hasBeenUsed: false,
        deletedAt: null,
      },
    });

    expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);

    expect(user?.email).not.toEqual(email);
    expect(user?.password).not.toEqual(password);

    expect(personalRefreshToken?.value).not.toEqual(signUpUserBody.refreshToken.value);
  });

  describe("Validations", () => {
    let accessToken: string;

    beforeAll(async () => {
      const signUpUserResponse: Response = await request.post("/user/sign-up").send({
        email: faker.internet.email(),
        password: faker.internet.password({ prefix: "$0" }),
      });

      const signUpUserBody: TokenDto = signUpUserResponse.body;

      accessToken = `Bearer ${signUpUserBody.accessToken.value}`;
    });

    each(updateUserFixture).it("$title", async ({ field, value, message }) => {
      const response: Response = await request
        .put("/user")
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
