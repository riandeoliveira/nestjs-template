import { Response } from "supertest";
import { MAXIMUM_REQUESTS_ALLOWED_PER_TTL, PROBLEM_DETAILS_URI } from "../../domain/constants";
import { HttpResponses } from "../../domain/constants/http-responses";
import { HttpMethodsKey } from "../../domain/enums/http-methods.enum";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { ProblemDetailsType } from "../../domain/types/problem-details";
import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { request } from "../../main.e2e-spec";
import { E2EResponseHelper } from "./e2e-response.helper";

type AuthenticateReturnType = {
  email: string;
  jwtCookies: string[];
  password: string;
};

export class E2ETestsHelper {
  public constructor(
    private readonly method: HttpMethodsKey,
    private readonly path: string,
  ) {}

  private async requestBy(method: HttpMethodsKey, path: string): Promise<Response> {
    const requestMethods = {
      GET: await request.get(path),
      POST: await request.post(path).send({}),
      PUT: await request.put(path).send({}),
      DELETE: await request.delete(path),
    };

    return requestMethods[method];
  }

  public authenticate = async (): Promise<AuthenticateReturnType> => {
    const email: string = FakeData.email();
    const password: string = FakeData.strongPassword();

    const response: Response = await request.post("/user/sign-up").send({
      email,
      password,
    });

    const jwtCookies: string[] = response.get("Set-Cookie");

    return {
      email,
      jwtCookies,
      password,
    };
  };

  public includeAuthenticationTest = (): void => {
    it("Should throw an error when trying to access without being authenticated", async () => {
      const response: Response = await this.requestBy(this.method, this.path);

      const { expectCorrectStatusCode, expectProblemDetails } = new E2EResponseHelper(
        response,
        "UNAUTHORIZED",
      );

      expectCorrectStatusCode();
      expectProblemDetails("UNAUTHORIZED_OPERATION");
    });
  };

  public includeRateLimitTest = (): void => {
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
  };
}
