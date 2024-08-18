import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { SignUpUserEndpoint } from "./sign-up-user.endpoint";
import { SignUpUserUseCase } from "./sign-up-user.use-case";

@Module({
  imports: [InfrastructureModule],
  controllers: [SignUpUserEndpoint],
  providers: [SignUpUserUseCase],
})
export class SignUpUserModule {}
