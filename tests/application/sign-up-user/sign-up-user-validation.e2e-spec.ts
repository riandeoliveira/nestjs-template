import each from "jest-each";
import { applicationTestBuilder } from "../../application-test-builder";
import { signUpUserFixture } from "./sign-up-user.fixture";
import { SignUpUserUtility } from "./sign-up-user.utility";

describe("Sign Up User | E2E Validation Tests", () => {
  let utility: SignUpUserUtility;

  beforeAll(async () => {
    const application = await applicationTestBuilder.start();

    utility = new SignUpUserUtility(application);
  });

  afterAll(async () => {
    await applicationTestBuilder.stop();
  });

  describe("Email Tests", () => {
    each(signUpUserFixture.email).it("Should $title", async ({ value, message }) => {
      await utility.expectValidationFailure(message, { email: value });
    });
  });

  describe("Password Tests", () => {
    each(signUpUserFixture.password).it("Should $title", async ({ value, message }) => {
      await utility.expectValidationFailure(message, { password: value });
    });
  });
});
