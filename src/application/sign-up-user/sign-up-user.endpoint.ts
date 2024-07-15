import { ProblemDetailsDto } from "@/domain/dtos/problem-details.dto";
import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { ApiResponse } from "@/infrastructure/decorators/api-response.decorator";
import { Body, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { SignUpUserRequest } from "./sign-up-user.request";
import { SignUpUserResponse } from "./sign-up-user.response";
import { SignUpUserUseCase } from "./sign-up-user.use-case";

@ApiEndpoint("user")
export class SignUpUserEndpoint {
  public constructor(private readonly useCase: SignUpUserUseCase) {}

  @ApiOperation({
    operationId: "sign-up-user",
    description: "Authenticates a new user and returns a token and user ID.",
    tags: ["User"],
  })
  @ApiResponse("CREATED", SignUpUserResponse)
  @ApiResponse("BAD_REQUEST", ProblemDetailsDto)
  @ApiResponse("CONFLICT", ProblemDetailsDto)
  @ApiResponse("TOO_MANY_REQUESTS", ProblemDetailsDto)
  @ApiResponse("INTERNAL_SERVER_ERROR", ProblemDetailsDto)
  @HttpCode(HttpStatus.CREATED)
  @Post("sign-up")
  public async handle(@Body() request: SignUpUserRequest): Promise<SignUpUserResponse> {
    return await this.useCase.execute(request);
  }
}
