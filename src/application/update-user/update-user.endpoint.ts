import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { ApiErrorResponses } from "@/infrastructure/decorators/api-error-responses";
import { ApiSuccessResponse } from "@/infrastructure/decorators/api-success.decorator";
import { AuthGuard } from "@/infrastructure/guards/auth.guard";
import { Body, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { UpdateUserRequest } from "./update-user.request";
import { UpdateUserUseCase } from "./update-user.use-case";

@ApiBearerAuth("jwt")
@ApiEndpoint("user")
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
    "CONFLICT",
    "TOO_MANY_REQUESTS",
    "INTERNAL_SERVER_ERROR",
  ])
  @ApiSuccessResponse("NO_CONTENT")
  @Put()
  @UseGuards(AuthGuard)
  public async handle(@Body() request: UpdateUserRequest): Promise<void> {
    await this.useCase.execute(request);
  }
}
