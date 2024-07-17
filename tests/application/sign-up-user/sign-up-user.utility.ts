import { HttpStatus, INestApplication } from "@nestjs/common";
import request, { Response } from "supertest";

export class SignUpUserUtility {
  public constructor(private readonly application: INestApplication) {}

  public async expectValidationFailure(
    message: string,
    { email = "", password = "" },
  ): Promise<void> {
    const response: Response = await request(this.application.getHttpServer())
      .post("/user/sign-up")
      .send({
        email,
        password,
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.title).toContain(message);
  }
}
