import { ProblemDetailsDto } from "@/domain/dtos/problem-details.dto";
import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { ApiResponse } from "@/infrastructure/decorators/api-response.decorator";
import { AuthGuard } from "@/infrastructure/guards/auth.guard";
import { Body, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
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
  @ApiResponse("OK", RenewUserRefreshTokenResponse)
  @ApiResponse("BAD_REQUEST", ProblemDetailsDto)
  @ApiResponse("UNAUTHORIZED", ProblemDetailsDto)
  @ApiResponse("NOT_FOUND", ProblemDetailsDto)
  @ApiResponse("TOO_MANY_REQUESTS", ProblemDetailsDto)
  @ApiResponse("INTERNAL_SERVER_ERROR", ProblemDetailsDto)
  @HttpCode(HttpStatus.OK)
  @Post("refresh-token/renew")
  @UseGuards(AuthGuard)
  public async handle(
    @Body() request: RenewUserRefreshTokenRequest,
  ): Promise<RenewUserRefreshTokenResponse> {
    return await this.useCase.execute(request);
  }
}
