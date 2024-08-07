import { HttpStatus } from "@nestjs/common";
import { PersonalRefreshToken, User } from "@prisma/client";
import each from "jest-each";
import { Response } from "supertest";
import { PROBLEM_DETAILS_URI } from "../../domain/constants";
import { ProblemDetailsDto } from "../../domain/dtos/problem-details.dto";
import { HttpMessages } from "../../domain/enums/http-messages.enum";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { CommonTestsUtility } from "../../domain/utilities/common-tests.utility";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { prisma, request } from "../../main.e2e-spec";
import { updateUserFixture } from "./update-user.fixture";

const commonTestsUtility = new CommonTestsUtility("PUT", "/user");

describe("Update User | E2E Tests", () => {
  describe("Use Cases", () => {
    commonTestsUtility.includeAuthenticationTest();
    commonTestsUtility.includeRateLimitTest();

    it("Should throw an error when user email is already being used", async () => {
      const firstUserEmail: string = FakeData.email();

      await request.post("/user/sign-up").send({
        email: firstUserEmail,
        password: FakeData.strongPassword(),
      });

      const { accessToken } = await commonTestsUtility.authenticate();

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
      const { accessToken, signUpUserBody, email, password } =
        await commonTestsUtility.authenticate();

      const response: Response = await request.put("/user").set("Authorization", accessToken).send({
        email: FakeData.email(),
        password: FakeData.strongPassword(),
      });

      const user: User | null = await prisma.user.findUnique({
        where: {
          id: signUpUserBody.userId,
          deletedAt: null,
        },
      });

      const personalRefreshToken: PersonalRefreshToken | null =
        await prisma.personalRefreshToken.findFirst({
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
  });

  describe("Validations", () => {
    let accessToken: string;

    beforeAll(async () => {
      const { accessToken: token } = await commonTestsUtility.authenticate();

      accessToken = token;
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
