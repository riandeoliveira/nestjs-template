import { Module } from "@nestjs/common";
import { DeleteUserModule } from "./delete-user/delete-user.module";
import { RenewUserRefreshTokenModule } from "./renew-user-refresh-token/renew-user-refresh-token.module";
import { ResetUserPasswordModule } from "./reset-user-password/reset-user-password.module";
import { SignInUserModule } from "./sign-in-user/sign-in-user.module";
import { SignOutUserModule } from "./sign-out-user/sign-out-user.module";
import { SignUpUserModule } from "./sign-up-user/sign-up-user.module";
import { UpdateUserModule } from "./update-user/update-user.module";
import { VerifyCurrentUserModule } from "./verify-current-user/verify-current-user.module";

@Module({
  imports: [
    DeleteUserModule,
    RenewUserRefreshTokenModule,
    ResetUserPasswordModule,
    SignInUserModule,
    SignOutUserModule,
    SignUpUserModule,
    UpdateUserModule,
    VerifyCurrentUserModule,
  ],
})
export class ApplicationModule {}
