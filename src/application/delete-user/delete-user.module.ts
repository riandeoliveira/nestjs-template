import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { DeleteUserEndpoint } from "./delete-user.endpoint";
import { DeleteUserUseCase } from "./delete-user.use-case";

@Module({
  imports: [InfrastructureModule],
  controllers: [DeleteUserEndpoint],
  providers: [DeleteUserUseCase],
})
export class DeleteUserModule {}
