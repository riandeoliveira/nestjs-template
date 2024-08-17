import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { VerifyCurrentUserEndpoint } from "./verify-current-user.endpoint";
import { VerifyCurrentUserUseCase } from "./verify-current-user.use-case";

@Module({
  imports: [InfrastructureModule],
  controllers: [VerifyCurrentUserEndpoint],
  providers: [VerifyCurrentUserUseCase],
})
export class VerifyCurrentUserModule {}
