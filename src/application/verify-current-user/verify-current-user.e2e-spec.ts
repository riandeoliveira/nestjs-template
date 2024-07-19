import { HttpStatus } from "@nestjs/common";
import { Response } from "supertest";
import { MAXIMUM_REQUESTS_ALLOWED_PER_TTL, PROBLEM_DETAILS_URI } from "../../domain/constants";
import { ProblemDetailsDto } from "../../domain/dtos/problem-details.dto";
import { HttpMessages } from "../../domain/enums/http-messages.enum";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { TestUtility } from "../../domain/utilities/test.utility";
import { request } from "../../main.e2e-spec";

describe("Verify Current User | E2E Tests", () => {
  describe("Use Cases", () => {
    it("Should throw an error when receiving too many requests", async () => {
      const responseList: Response[] = [];

      for (let i = 0; i < MAXIMUM_REQUESTS_ALLOWED_PER_TTL + 1; i++) {
        const response: Response = await request.get("/user/verify");

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

    it("Should throw an error when the authenticated user is not found", async () => {
      const { accessToken } = await TestUtility.authenticate();

      await request.delete("/user").set("Authorization", accessToken);

      const response: Response = await request
        .get("/user/verify")
        .set("Authorization", accessToken);

      const status: number = HttpStatus.NOT_FOUND;
      const body: ProblemDetailsDto = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.USER_NOT_FOUND);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(HttpMessages.NOT_FOUND);
    });

    it("Should throw an error when trying to access without being authenticated", async () => {
      const response: Response = await request.get("/user/verify");

      const status: number = HttpStatus.UNAUTHORIZED;
      const body: ProblemDetailsDto = response.body;

      expect(response.statusCode).toEqual(status);

      expect(body.type).toEqual(`${PROBLEM_DETAILS_URI}/${status}`);
      expect(body.title).toEqual(ResponseMessages.UNAUTHORIZED_OPERATION);
      expect(body.status).toEqual(status);
      expect(body.detail).toEqual(HttpMessages.UNAUTHORIZED);
    });

    it("Should verify the authenticated user", async () => {
      const { accessToken } = await TestUtility.authenticate();

      const response: Response = await request
        .get("/user/verify")
        .set("Authorization", accessToken);

      expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
    });
  });
});
