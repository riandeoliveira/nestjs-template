import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { ApiErrorResponses } from "@/infrastructure/decorators/api-error-responses.decorator";
import { ApiSuccessResponse } from "@/infrastructure/decorators/api-success.decorator";
import { Body, Post } from "@nestjs/common";
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
  @ApiErrorResponses(["BAD_REQUEST", "CONFLICT", "INTERNAL_SERVER_ERROR", "TOO_MANY_REQUESTS"])
  @ApiSuccessResponse("CREATED", SignUpUserResponse)
  @Post("sign-up")
  public async handle(@Body() request: SignUpUserRequest): Promise<SignUpUserResponse> {
    return await this.useCase.execute(request);
  }
}
