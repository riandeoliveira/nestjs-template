import { Body, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ApiEndpoint } from "../../infrastructure/decorators/api-endpoint.decorator";
import { ApiErrorResponses } from "../../infrastructure/decorators/api-error-responses.decorator";
import { ApiSuccessResponse } from "../../infrastructure/decorators/api-success.decorator";
import { ForgotUserPasswordRequest } from "./forgot-user-password.request";
import { ForgotUserPasswordUseCase } from "./forgot-user-password.use-case";

@ApiEndpoint("user")
export class ForgotUserPasswordEndpoint {
  public constructor(private readonly useCase: ForgotUserPasswordUseCase) {}

  @ApiOperation({
    description: "",
    operationId: "",
    tags: ["User"],
  })
  @ApiErrorResponses(["BAD_REQUEST", "INTERNAL_SERVER_ERROR", "NOT_FOUND", "TOO_MANY_REQUESTS"])
  @ApiSuccessResponse("NO_CONTENT")
  @Post("forgot-password")
  public async handle(@Body() request: ForgotUserPasswordRequest): Promise<void> {
    await this.useCase.execute(request);
  }
}
