import { User } from "@prisma/client";
import each from "jest-each";
import { Response } from "supertest";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { E2EResponseHelper } from "../../infrastructure/helpers/e2e-response.helper";
import { E2ETestsHelper } from "../../infrastructure/helpers/e2e-tests.helper";
import { CookiesUtility } from "../../infrastructure/utilities/cookies.utility";
import { authService, prisma, request } from "../../main.e2e-spec";
import { updateUserFixture } from "./update-user.fixture";

const { includeAuthenticationTest, includeRateLimitTest, authenticate } = new E2ETestsHelper(
  "PUT",
  "/user",
);

describe("Update User | E2E Tests", () => {
  describe("Use Cases", () => {
    includeAuthenticationTest();
    includeRateLimitTest();

    it("Should update a user", async () => {
      const { jwtCookies, email, password } = await authenticate();

      const response: Response = await request.put("/user").set("Cookie", jwtCookies).send({
        email: FakeData.email(),
        password: FakeData.strongPassword(),
      });

      const { expectCorrectStatusCode } = new E2EResponseHelper(response, "NO_CONTENT");

      const accessToken: string = CookiesUtility.getJwtTokenFromCookies(jwtCookies, "access_token");

      const { userId } = await authService.validateTokenOrThrow(accessToken);

      const user: User | null = await prisma.user.findUnique({
        where: {
          id: userId,
          deletedAt: null,
        },
      });

      expectCorrectStatusCode();

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

    const { jwtCookies } = await authenticate();

    const response: Response = await request.put("/user").set("Cookie", jwtCookies).send({
      email: firstUserEmail,
    });

    const { expectCorrectStatusCode, expectProblemDetails } = new E2EResponseHelper(
      response,
      "CONFLICT",
    );

    expectCorrectStatusCode();
    expectProblemDetails("EMAIL_ALREADY_EXISTS");
  });

  describe("Validations", () => {
    let cookies: string[];

    beforeAll(async () => {
      const { jwtCookies } = await authenticate();

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

      const { expectCorrectStatusCode, expectProblemDetails } = new E2EResponseHelper(
        response,
        "BAD_REQUEST",
      );

      expectCorrectStatusCode();
      expectProblemDetails(message);
    });
  });
});
