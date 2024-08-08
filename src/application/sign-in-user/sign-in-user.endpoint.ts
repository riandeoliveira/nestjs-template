import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { ApiErrorResponses } from "@/infrastructure/decorators/api-error-responses.decorator";
import { ApiSuccessResponse } from "@/infrastructure/decorators/api-success.decorator";
import { Body, Post } from "@nestjs/common";
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
  @ApiErrorResponses([
    "BAD_REQUEST",
    "INTERNAL_SERVER_ERROR",
    "NOT_FOUND",
    "TOO_MANY_REQUESTS",
    "UNAUTHORIZED",
  ])
  @ApiSuccessResponse("OK", SignInUserResponse)
  @Post("sign-in")
  public async handle(@Body() request: SignInUserRequest): Promise<SignInUserResponse> {
    return await this.useCase.execute(request);
  }
}
