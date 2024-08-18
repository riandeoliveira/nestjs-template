import { Response } from "supertest";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { request } from "../../main.e2e-spec";
import { MAXIMUM_REQUESTS_ALLOWED_PER_TTL, PROBLEM_DETAILS_URI } from "../constants";
import { HttpResponses } from "../constants/http-responses";
import { TokenDto } from "../dtos/token.dto";
import { HttpMethodsKey } from "../enums/http-methods.enum";
import { ResponseMessages } from "../enums/response-messages.enum";
import { ProblemDetailsType } from "../types/problem-details";

type AuthenticateReturnType = {
  accessToken: string;
  email: string;
  password: string;
  signUpUserBody: TokenDto;
};

export class CommonTestsUtility {
  public constructor(
    private readonly method: HttpMethodsKey,
    private readonly path: string,
  ) {}

  public async authenticate(): Promise<AuthenticateReturnType> {
    const email: string = FakeData.email();
    const password: string = FakeData.strongPassword();

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

  public includeAuthenticationTest(): void {
    it("Should throw an error when trying to access without being authenticated", async () => {
      const response: Response = await this.requestBy(this.method, this.path);

      const { status, message } = HttpResponses.UNAUTHORIZED;

      const body: ProblemDetailsType = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.UNAUTHORIZED_OPERATION);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(message);
    });
  }

  public includeRateLimitTest(): void {
    it("Should throw an error when receiving too many requests", async () => {
      const responses: Response[] = [];

      for (let i = 0; i < MAXIMUM_REQUESTS_ALLOWED_PER_TTL + 1; i++) {
        const response: Response = await this.requestBy(this.method, this.path);

        responses.push(response);
      }

      const { status } = HttpResponses.TOO_MANY_REQUESTS;

      const response = responses.find((response) => response.statusCode === status) as Response;

      const body: ProblemDetailsType = response.body;

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
