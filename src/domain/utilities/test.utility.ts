import { request } from "@/main.e2e-spec";
import { faker } from "@faker-js/faker";
import { Response } from "supertest";
import { TokenDto } from "../dtos/token.dto";

type AuthenticateReturnType = Promise<{
  accessToken: string;
  email: string;
  password: string;
  signUpUserBody: TokenDto;
}>;

export abstract class TestUtility {
  public static async authenticate(): AuthenticateReturnType {
    const email: string = faker.internet.email();
    const password: string = faker.internet.password({ prefix: "$0" });

    const signUpUserResponse: Response = await request.post("/user/sign-up").send({
      email,
      password,
    });

    const signUpUserBody: TokenDto = signUpUserResponse.body;
    const accessToken: string = `Bearer ${signUpUserBody.accessToken.value}`;

    return {
      accessToken,
      email,
      password,
      signUpUserBody,
    };
  }
}
