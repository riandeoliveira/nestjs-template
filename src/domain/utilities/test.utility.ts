import { request } from "@/main.e2e-spec";
import { faker } from "@faker-js/faker";
import { HttpStatus } from "@nestjs/common";
import { Response } from "supertest";
import { MAXIMUM_REQUESTS_ALLOWED_PER_TTL, PROBLEM_DETAILS_URI } from "../constants";
import { ProblemDetailsDto } from "../dtos/problem-details.dto";
import { TokenDto } from "../dtos/token.dto";
import { HttpMessages } from "../enums/http-messages.enum";
import { HttpMethodsKey } from "../enums/http-methods.enum";
import { ResponseMessages } from "../enums/response-messages.enum";

type AuthenticateReturnType = {
  accessToken: string;
  email: string;
  password: string;
  signUpUserBody: TokenDto;
};

export class TestUtility {
  public constructor(
    private readonly method: HttpMethodsKey,
    private readonly path: string,
  ) {}

  public async authenticate(): Promise<AuthenticateReturnType> {
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

  public includeAuthenticatedUserTest(): void {
    it("Should throw an error when the authenticated user is not found", async () => {
      const { accessToken } = await this.authenticate();

      await request.delete("/user").set("Authorization", accessToken);

      const requestMethods = {
        DELETE: await request.delete(this.path).set("Authorization", accessToken),
        GET: await request.get(this.path).set("Authorization", accessToken),
        POST: await request.post(this.path).set("Authorization", accessToken).send({
          email: faker.internet.email(),
        }),
        PUT: await request.put(this.path).set("Authorization", accessToken).send({
          email: faker.internet.email(),
        }),
      };

      const response: Response = requestMethods[this.method];

      const status: number = HttpStatus.NOT_FOUND;
      const body: ProblemDetailsDto = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.USER_NOT_FOUND);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(HttpMessages.NOT_FOUND);
    });
  }

  public includeAuthenticationTest(): void {
    it("Should throw an error when trying to access without being authenticated", async () => {
      const response: Response = await this.requestBy(this.method, this.path);

      const status: number = HttpStatus.UNAUTHORIZED;
      const body: ProblemDetailsDto = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.UNAUTHORIZED_OPERATION);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(HttpMessages.UNAUTHORIZED);
    });
  }

  public includeRateLimitTest(): void {
    it("Should throw an error when receiving too many requests", async () => {
      const responseList: Response[] = [];

      for (let i = 0; i < MAXIMUM_REQUESTS_ALLOWED_PER_TTL + 1; i++) {
        const response: Response = await this.requestBy(this.method, this.path);

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
  }

  private async requestBy(method: HttpMethodsKey, path: string): Promise<Response> {
    const requestMethods = {
      DELETE: await request.delete(path),
      GET: await request.get(path),
      POST: await request.post(path).send({}),
      PUT: await request.put(path).send({}),
    };

    return requestMethods[method];
  }
}
