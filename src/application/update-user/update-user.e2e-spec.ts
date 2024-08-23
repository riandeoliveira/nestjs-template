import { User } from "@prisma/client";
import each from "jest-each";
import { Response } from "supertest";
import { PROBLEM_DETAILS_URI } from "../../domain/constants";
import { HttpResponses } from "../../domain/constants/http-responses";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { ProblemDetailsType } from "../../domain/types/problem-details";
import { TestsUtility } from "../../domain/utilities/tests.utility";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { authService, prisma, request } from "../../main.e2e-spec";
import { updateUserFixture } from "./update-user.fixture";

const testsUtility = new TestsUtility({
  method: "PUT",
  path: "/user",
});

describe("Update User | E2E Tests", () => {
  describe("Use Cases", () => {
    testsUtility.includeAuthenticationTest();
    testsUtility.includeRateLimitTest();

    it("Should update a user", async () => {
      const { jwtCookies, email, password } = await testsUtility.authenticate();

      const response: Response = await request.put("/user").set("Cookie", jwtCookies).send({
        email: FakeData.email(),
        password: FakeData.strongPassword(),
      });

      const accessToken: string = testsUtility.getAccessTokenFromCookies(jwtCookies);

      const { userId } = await authService.validateTokenOrThrow(accessToken);

      const user: User | null = await prisma.user.findUnique({
        where: {
          id: userId,
          deletedAt: null,
        },
      });

      expect(response.statusCode).toEqual(HttpResponses.NO_CONTENT.status);

      expect(user?.email).not.toEqual(email);
      expect(user?.password).not.toEqual(password);
    });
  });

  it("Should throw an error when user email is already being used", async () => {
    const firstUserEmail: string = FakeData.email();

    await request.post("/user/sign-up").send({
      email: firstUserEmail,
      password: FakeData.strongPassword(),
    });

    const { jwtCookies } = await testsUtility.authenticate();

    const response: Response = await request.put("/user").set("Cookie", jwtCookies).send({
      email: firstUserEmail,
    });

    const { status, message } = HttpResponses.CONFLICT;

    const body: ProblemDetailsType = response.body;

    expect(response.statusCode).toEqual(status);

    expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
    expect(body.title).toEqual(ResponseMessages.EMAIL_ALREADY_EXISTS);
    expect(body.status).toEqual(status);
    expect(body.detail).toEqual(message);
  });

  describe("Validations", () => {
    let cookies: string[];

    beforeAll(async () => {
      const { jwtCookies } = await testsUtility.authenticate();

      cookies = jwtCookies;
    });

    each(updateUserFixture).it("$title", async ({ field, value, message }) => {
      const response: Response = await request
        .put("/user")
        .set("Cookie", cookies)
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
