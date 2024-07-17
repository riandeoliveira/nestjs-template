import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { Module } from "@nestjs/common";
import { DeleteUserEndpoint } from "./delete-user/delete-user.endpoint";
import { DeleteUserUseCase } from "./delete-user/delete-user.use-case";
import { RenewUserRefreshTokenEndpoint } from "./renew-user-refresh-token/renew-user-refresh-token.endpoint";
import { RenewUserRefreshTokenUseCase } from "./renew-user-refresh-token/renew-user-refresh-token.use-case";
import { SignInUserEndpoint } from "./sign-in-user/sign-in-user.endpoint";
import { SignInUserUseCase } from "./sign-in-user/sign-in-user.use-case";
import { SignOutUserEndpoint } from "./sign-out-user/sign-out-user.endpoint";
import { SignOutUserUseCase } from "./sign-out-user/sign-out-user.use-case";
import { SignUpUserEndpoint } from "./sign-up-user/sign-up-user.endpoint";
import { SignUpUserUseCase } from "./sign-up-user/sign-up-user.use-case";
import { UpdateUserEndpoint } from "./update-user/update-user.endpoint";
import { UpdateUserUseCase } from "./update-user/update-user.use-case";
import { VerifyCurrentUserEndpoint } from "./verify-current-user/verify-current-user.endpoint";
import { VerifyCurrentUserUseCase } from "./verify-current-user/verify-current-user.use-case";

@Module({
  imports: [InfrastructureModule],
  controllers: [
    DeleteUserEndpoint,
    RenewUserRefreshTokenEndpoint,
    SignInUserEndpoint,
    SignOutUserEndpoint,
    SignUpUserEndpoint,
    UpdateUserEndpoint,
    VerifyCurrentUserEndpoint,
  ],
  providers: [
    DeleteUserUseCase,
    RenewUserRefreshTokenUseCase,
    SignInUserUseCase,
    SignOutUserUseCase,
    SignUpUserUseCase,
    UpdateUserUseCase,
    VerifyCurrentUserUseCase,
  ],
})
export class ApplicationModule {}
