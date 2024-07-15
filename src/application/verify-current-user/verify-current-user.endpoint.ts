import { ProblemDetailsDto } from "@/domain/dtos/problem-details.dto";
import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { ApiResponse } from "@/infrastructure/decorators/api-response.decorator";
import { AuthGuard } from "@/infrastructure/guards/auth.guard";
import { Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { VerifyCurrentUserUseCase } from "./verify-current-user.use-case";

@ApiBearerAuth("jwt")
@ApiEndpoint("user")
export class VerifyCurrentUserEndpoint {
  public constructor(private readonly useCase: VerifyCurrentUserUseCase) {}

  @ApiOperation({
    description: "",
    operationId: "",
    tags: ["User"],
  })
  @ApiResponse("NO_CONTENT")
  @ApiResponse("UNAUTHORIZED", ProblemDetailsDto)
  @ApiResponse("NOT_FOUND", ProblemDetailsDto)
  @ApiResponse("TOO_MANY_REQUESTS", ProblemDetailsDto)
  @ApiResponse("INTERNAL_SERVER_ERROR", ProblemDetailsDto)
  @Get("verify")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  public async handle(): Promise<void> {
    await this.useCase.execute();
  }
}
