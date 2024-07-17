import { HttpStatus } from "@nestjs/common";
import request, { Response } from "supertest";
import { application } from "../../main.e2e-spec";

export abstract class SignUpUserUtility {
  public static async expectValidationFailure(
    message: string,
    { email = "", password = "" },
  ): Promise<void> {
    const response: Response = await request(application.getHttpServer())
      .post("/user/sign-up")
      .send({
        email,
        password,
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.title).toContain(message);
  }
}
