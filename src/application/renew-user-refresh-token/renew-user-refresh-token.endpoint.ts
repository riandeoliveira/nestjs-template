import { Body, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ApiEndpoint } from "../../infrastructure/decorators/api-endpoint.decorator";
import { ApiErrorResponses } from "../../infrastructure/decorators/api-error-responses.decorator";
import { ApiSuccessResponse } from "../../infrastructure/decorators/api-success.decorator";
import { Authorize } from "../../infrastructure/decorators/authorize.decorator";
import { RenewUserRefreshTokenRequest } from "./renew-user-refresh-token.request";
import { RenewUserRefreshTokenResponse } from "./renew-user-refresh-token.response";
import { RenewUserRefreshTokenUseCase } from "./renew-user-refresh-token.use-case";

@ApiEndpoint("user")
@Authorize()
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
  @ApiSuccessResponse("OK", RenewUserRefreshTokenResponse)
  @Post("refresh-token/renew")
  public async handle(
    @Body() request: RenewUserRefreshTokenRequest,
  ): Promise<RenewUserRefreshTokenResponse> {
    return await this.useCase.execute(request);
  }
}
