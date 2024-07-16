import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { ApiErrorResponses } from "@/infrastructure/decorators/api-error-responses";
import { ApiSuccessResponse } from "@/infrastructure/decorators/api-success.decorator";
import { AuthGuard } from "@/infrastructure/guards/auth.guard";
import { Delete, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { DeleteUserUseCase } from "./delete-user.use-case";

@ApiBearerAuth("jwt")
@ApiEndpoint("user")
export class DeleteUserEndpoint {
  public constructor(private readonly useCase: DeleteUserUseCase) {}

  @ApiOperation({
    description: "",
    operationId: "",
    tags: ["User"],
  })
  @ApiErrorResponses(["UNAUTHORIZED", "NOT_FOUND", "TOO_MANY_REQUESTS", "INTERNAL_SERVER_ERROR"])
  @ApiSuccessResponse("NO_CONTENT")
  @Delete()
  @UseGuards(AuthGuard)
  public async handle(): Promise<void> {
    await this.useCase.execute();
  }
}
