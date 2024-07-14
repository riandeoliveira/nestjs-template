import { ApiEndpoint } from "@/infrastructure/decorators/api-endpoint.decorator";
import { AuthGuard } from "@/infrastructure/modules/auth/auth.guard";
import { Delete, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { DeleteUserUseCase } from "./delete-user.use-case";

@ApiBearerAuth("jwt")
@ApiEndpoint("user")
export class DeleteUserEndpoint {
  public constructor(private readonly useCase: DeleteUserUseCase) {}

  @ApiOperation({
    description: "",
    operationId: "",
    tags: ["User"],
  })
  @Delete()
  @UseGuards(AuthGuard)
  public async handle(): Promise<void> {
    await this.useCase.execute();
  }
}
