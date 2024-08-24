import { Response } from "supertest";
import { PROBLEM_DETAILS_URI } from "../../domain/constants";
import { HttpResponses, HttpResponsesKey } from "../../domain/constants/http-responses";
import { ResponseMessages, ResponseMessagesKey } from "../../domain/enums/response-messages.enum";
import { ProblemDetailsType } from "../../domain/types/problem-details";
import { CookiesUtility } from "../utilities/cookies.utility";

export class E2EResponseHelper {
  public constructor(
    private readonly response: Response,
    private readonly type: HttpResponsesKey,
  ) {}

  public expectCorrectStatusCode = (): void => {
    expect(this.response.statusCode).toEqual(HttpResponses[this.type].status);
  };

  public expectEmptyJwtCookies = (cookies: string[]): void => {
    const emptyAccessToken: string = CookiesUtility.getJwtTokenFromCookies(cookies, "access_token");

    const emptyRefreshToken: string = CookiesUtility.getJwtTokenFromCookies(
      cookies,
      "refresh_token",
    );

    expect(emptyAccessToken).toEqual("");
    expect(emptyRefreshToken).toEqual("");
  };

  public expectProblemDetails = (messageType: ResponseMessagesKey): void => {
    const body: ProblemDetailsType = this.response.body;

    const status: number = HttpResponses[this.type].status;

    expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
    expect(body.title).toContain(ResponseMessages[messageType]);
    expect(body.status).toEqual(status);
    expect(body.detail).toEqual(HttpResponses[this.type].message);
  };
}
