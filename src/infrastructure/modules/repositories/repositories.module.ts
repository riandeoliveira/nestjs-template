import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PersonalRefreshTokenRepository } from "./personal-refresh-token.repository";
import { UserRepository } from "./user.repository";

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [PersonalRefreshTokenRepository, UserRepository],
  exports: [PersonalRefreshTokenRepository, UserRepository],
})
export class RepositoriesModule {}
