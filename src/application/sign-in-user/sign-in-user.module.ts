import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { SignInUserEndpoint } from "./sign-in-user.endpoint";
import { SignInUserUseCase } from "./sign-in-user.use-case";

@Module({
  imports: [InfrastructureModule],
  controllers: [SignInUserEndpoint],
  providers: [SignInUserUseCase],
})
export class SignInUserModule {}
