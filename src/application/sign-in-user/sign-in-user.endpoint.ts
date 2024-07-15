import { ProblemDetailsDto } from "@/domain/dtos/problem-details.dto";
import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { ApiResponse } from "@/infrastructure/decorators/api-response.decorator";
import { Body, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { SignInUserRequest } from "./sign-in-user.request";
import { SignInUserResponse } from "./sign-in-user.response";
import { SignInUserUseCase } from "./sign-in-user.use-case";

@ApiEndpoint("user")
export class SignInUserEndpoint {
  public constructor(private readonly useCase: SignInUserUseCase) {}

  @ApiOperation({
    description: "Authenticates a user and returns a token and user ID.",
    operationId: "sign-in-user",
    tags: ["User"],
  })
  @ApiResponse("OK", SignInUserResponse)
  @ApiResponse("BAD_REQUEST", ProblemDetailsDto)
  @ApiResponse("UNAUTHORIZED", ProblemDetailsDto)
  @ApiResponse("TOO_MANY_REQUESTS", ProblemDetailsDto)
  @ApiResponse("INTERNAL_SERVER_ERROR", ProblemDetailsDto)
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  public async handle(@Body() request: SignInUserRequest): Promise<SignInUserResponse> {
    return await this.useCase.execute(request);
  }
}
