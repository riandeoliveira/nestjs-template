import { Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ApiEndpoint } from "../../infrastructure/decorators/api-endpoint.decorator";
import { ApiErrorResponses } from "../../infrastructure/decorators/api-error-responses.decorator";
import { ApiSuccessResponse } from "../../infrastructure/decorators/api-success.decorator";
import { Cookies } from "../../infrastructure/decorators/cookies.decorator";
import { RenewUserRefreshTokenRequest } from "./renew-user-refresh-token.request";
import { RenewUserRefreshTokenUseCase } from "./renew-user-refresh-token.use-case";

@ApiEndpoint("user")
export class RenewUserRefreshTokenEndpoint {
  public constructor(private readonly useCase: RenewUserRefreshTokenUseCase) {}

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
  @Post("refresh-token/renew")
  public async handle(
    @Cookies({ name: "refresh_token", type: RenewUserRefreshTokenRequest })
    request: RenewUserRefreshTokenRequest,
  ): Promise<void> {
    await this.useCase.execute(request);
  }
}
