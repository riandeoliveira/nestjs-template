import { faker } from "@faker-js/faker";
import { HttpStatus } from "@nestjs/common";
import request, { Response } from "supertest";
import { application } from "../../main.e2e-spec";

describe("Sign Up User | E2E Business Tests", () => {
  it("should create an user", async () => {
    const response: Response = await request(application.getHttpServer())
      .post("/user/sign-up")
      .send({
        email: faker.internet.email(),
        password: faker.internet.password({ prefix: "$0" }),
      });

    console.clear();
    console.log(response.body);

    expect(response.status).toEqual(HttpStatus.CREATED);
  });

  // describe("Email Tests", () => {
  //   each(signUpUserFixture.email).it("Should $title", async ({ value, message }) => {
  //     await utility.expectValidationFailure(message, { email: value });
  //   });
  // });

  // describe("Password Tests", () => {
  //   each(signUpUserFixture.password).it("Should $title", async ({ value, message }) => {
  //     await utility.expectValidationFailure(message, { password: value });
  //   });
  // });
});
