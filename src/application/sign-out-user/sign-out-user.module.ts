import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { SignOutUserEndpoint } from "./sign-out-user.endpoint";
import { SignOutUserUseCase } from "./sign-out-user.use-case";

@Module({
  imports: [InfrastructureModule],
  controllers: [SignOutUserEndpoint],
  providers: [SignOutUserUseCase],
})
export class SignOutUserModule {}
