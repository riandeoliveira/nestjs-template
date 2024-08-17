import { Body, Put } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ApiEndpoint } from "../../infrastructure/decorators/api-endpoint.decorator";
import { ApiErrorResponses } from "../../infrastructure/decorators/api-error-responses.decorator";
import { ApiSuccessResponse } from "../../infrastructure/decorators/api-success.decorator";
import { Authorize } from "../../infrastructure/decorators/authorize.decorator";
import { UpdateUserRequest } from "./update-user.request";
import { UpdateUserUseCase } from "./update-user.use-case";

@ApiEndpoint("user")
@Authorize()
export class UpdateUserEndpoint {
  public constructor(private readonly useCase: UpdateUserUseCase) {}

  @ApiOperation({
    description: "",
    operationId: "",
    tags: ["User"],
  })
  @ApiErrorResponses([
    "BAD_REQUEST",
    "CONFLICT",
    "INTERNAL_SERVER_ERROR",
    "NOT_FOUND",
    "TOO_MANY_REQUESTS",
    "UNAUTHORIZED",
  ])
  @ApiSuccessResponse("NO_CONTENT")
  @Put()
  public async handle(@Body() request: UpdateUserRequest): Promise<void> {
    await this.useCase.execute(request);
  }
}
