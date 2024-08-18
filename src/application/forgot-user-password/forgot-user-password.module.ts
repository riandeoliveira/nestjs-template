import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { ForgotUserPasswordEndpoint } from "./forgot-user-password.endpoint";
import { ForgotUserPasswordUseCase } from "./forgot-user-password.use-case";

@Module({
  imports: [InfrastructureModule],
  controllers: [ForgotUserPasswordEndpoint],
  providers: [ForgotUserPasswordUseCase],
})
export class ForgotUserPasswordModule {}
