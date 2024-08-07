import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { ApiErrorResponses } from "@/infrastructure/decorators/api-error-responses";
import { ApiSuccessResponse } from "@/infrastructure/decorators/api-success.decorator";
import { Authorize } from "@/infrastructure/decorators/authorize.decorator";
import { Body, Put } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
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
    "UNAUTHORIZED",
    "NOT_FOUND",
    "CONFLICT",
    "TOO_MANY_REQUESTS",
    "INTERNAL_SERVER_ERROR",
  ])
  @ApiSuccessResponse("NO_CONTENT")
  @Put()
  public async handle(@Body() request: UpdateUserRequest): Promise<void> {
    await this.useCase.execute(request);
  }
}
