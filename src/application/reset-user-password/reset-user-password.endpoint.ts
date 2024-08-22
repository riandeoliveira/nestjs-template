import { Body, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ApiEndpoint } from "../../infrastructure/decorators/api-endpoint.decorator";
import { ApiErrorResponses } from "../../infrastructure/decorators/api-error-responses.decorator";
import { ApiSuccessResponse } from "../../infrastructure/decorators/api-success.decorator";
import { Authorize } from "../../infrastructure/decorators/authorize.decorator";
import { ResetUserPasswordRequest } from "./reset-user-password.request";
import { ResetUserPasswordUseCase } from "./reset-user-password.use-case";

@ApiEndpoint("user")
@Authorize()
export class ResetUserPasswordEndpoint {
  public constructor(private readonly useCase: ResetUserPasswordUseCase) {}

  @ApiOperation({
    description: "",
    operationId: "",
    tags: ["User"],
  })
  @ApiErrorResponses([
    "BAD_REQUEST",
    "INTERNAL_SERVER_ERROR",
    "NOT_FOUND",
    "TOO_MANY_REQUESTS",
    "UNAUTHORIZED",
  ])
  @ApiSuccessResponse("NO_CONTENT")
  @Post("reset-password")
  public async handle(@Body() request: ResetUserPasswordRequest): Promise<void> {
    await this.useCase.execute(request);
  }
}
