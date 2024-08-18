import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { ResetUserPasswordEndpoint } from "./reset-user-password.endpoint";
import { ResetUserPasswordUseCase } from "./reset-user-password.use-case";

@Module({
  imports: [InfrastructureModule],
  controllers: [ResetUserPasswordEndpoint],
  providers: [ResetUserPasswordUseCase],
})
export class ResetUserPasswordModule {}
