import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { UpdateUserEndpoint } from "./update-user.endpoint";
import { UpdateUserUseCase } from "./update-user.use-case";

@Module({
  imports: [InfrastructureModule],
  controllers: [UpdateUserEndpoint],
  providers: [UpdateUserUseCase],
})
export class UpdateUserModule {}
