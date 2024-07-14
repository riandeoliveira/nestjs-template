import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { Module } from "@nestjs/common";
import { DeleteUserEndpoint } from "./delete-user/delete-user.endpoint";
import { DeleteUserUseCase } from "./delete-user/delete-user.use-case";
import { SignInUserEndpoint } from "./sign-in-user/sign-in-user.endpoint";
import { SignInUserUseCase } from "./sign-in-user/sign-in-user.use-case";
import { SignUpUserEndpoint } from "./sign-up-user/sign-up-user.endpoint";
import { SignUpUserUseCase } from "./sign-up-user/sign-up-user.use-case";
import { UpdateUserEndpoint } from "./update-user/update-user.endpoint";
import { UpdateUserUseCase } from "./update-user/update-user.use-case";

@Module({
  imports: [InfrastructureModule],
  controllers: [DeleteUserEndpoint, SignInUserEndpoint, SignUpUserEndpoint, UpdateUserEndpoint],
  providers: [DeleteUserUseCase, SignInUserUseCase, SignUpUserUseCase, UpdateUserUseCase],
})
export class ApplicationModule {}
