import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { ApiErrorResponses } from "@/infrastructure/decorators/api-error-responses";
import { ApiSuccessResponse } from "@/infrastructure/decorators/api-success.decorator";
import { Authorize } from "@/infrastructure/decorators/authorize.decorator";
import { Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { VerifyCurrentUserUseCase } from "./verify-current-user.use-case";

@ApiEndpoint("user")
@Authorize()
export class VerifyCurrentUserEndpoint {
  public constructor(private readonly useCase: VerifyCurrentUserUseCase) {}

  @ApiOperation({
    description: "",
    operationId: "",
    tags: ["User"],
  })
  @ApiErrorResponses(["UNAUTHORIZED", "NOT_FOUND", "TOO_MANY_REQUESTS", "INTERNAL_SERVER_ERROR"])
  @ApiSuccessResponse("NO_CONTENT")
  @Get("verify")
  public async handle(): Promise<void> {
    await this.useCase.execute();
  }
}
