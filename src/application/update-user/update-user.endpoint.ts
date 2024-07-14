import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { AuthGuard } from "@/infrastructure/modules/auth/auth.guard";
import { Body, Put, UseGuards } from "@nestjs/common";
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
  @Put()
  @UseGuards(AuthGuard)
  public async handle(@Body() request: UpdateUserRequest): Promise<void> {
    await this.useCase.execute(request);
  }
}
