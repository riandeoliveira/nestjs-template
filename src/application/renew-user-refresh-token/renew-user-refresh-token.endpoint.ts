import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { ApiErrorResponses } from "@/infrastructure/decorators/api-error-responses";
import { ApiSuccessResponse } from "@/infrastructure/decorators/api-success.decorator";
import { AuthGuard } from "@/infrastructure/guards/auth.guard";
import { Body, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { RenewUserRefreshTokenRequest } from "./renew-user-refresh-token.request";
import { RenewUserRefreshTokenResponse } from "./renew-user-refresh-token.response";
import { RenewUserRefreshTokenUseCase } from "./renew-user-refresh-token.use-case";

@ApiBearerAuth("jwt")
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
    "UNAUTHORIZED",
    "NOT_FOUND",
    "TOO_MANY_REQUESTS",
    "INTERNAL_SERVER_ERROR",
  ])
  @ApiSuccessResponse("OK", RenewUserRefreshTokenResponse)
  @Post("refresh-token/renew")
  @UseGuards(AuthGuard)
  public async handle(
    @Body() request: RenewUserRefreshTokenRequest,
  ): Promise<RenewUserRefreshTokenResponse> {
    return await this.useCase.execute(request);
  }
}