import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { ProvidersModule } from "../providers/providers.module";
import { PersonalRefreshTokenRepository } from "./personal-refresh-token.repository";
import { UserRepository } from "./user.repository";

@Module({
  imports: [PrismaModule, ProvidersModule],
  providers: [PersonalRefreshTokenRepository, UserRepository],
  exports: [PersonalRefreshTokenRepository, UserRepository],
})
export class RepositoriesModule {}
