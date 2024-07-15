import { ProblemDetailsDto } from "@/domain/dtos/problem-details.dto";
import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { ApiResponse } from "@/infrastructure/decorators/api-response.decorator";
import { AuthGuard } from "@/infrastructure/guards/auth.guard";
import { Body, HttpCode, HttpStatus, Put, UseGuards } from "@nestjs/common";
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
  @ApiResponse("NO_CONTENT")
  @ApiResponse("BAD_REQUEST", ProblemDetailsDto)
  @ApiResponse("UNAUTHORIZED", ProblemDetailsDto)
  @ApiResponse("CONFLICT", ProblemDetailsDto)
  @ApiResponse("TOO_MANY_REQUESTS", ProblemDetailsDto)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put()
  @UseGuards(AuthGuard)
  public async handle(@Body() request: UpdateUserRequest): Promise<void> {
    await this.useCase.execute(request);
  }
}
