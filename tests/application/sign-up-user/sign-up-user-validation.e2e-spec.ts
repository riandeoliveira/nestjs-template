import each from "jest-each";
import { signUpUserFixture } from "./sign-up-user.fixture";
import { SignUpUserUtility } from "./sign-up-user.utility";

describe("Sign Up User | E2E Validation Tests", () => {
  describe("Email Tests", () => {
    each(signUpUserFixture.email).it("Should $title", async ({ value, message }) => {
      await SignUpUserUtility.expectValidationFailure(message, { email: value });
    });
  });

  describe("Password Tests", () => {
    each(signUpUserFixture.password).it("Should $title", async ({ value, message }) => {
      await SignUpUserUtility.expectValidationFailure(message, { password: value });
    });
  });
});
