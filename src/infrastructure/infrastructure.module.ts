import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { EnvironmentModule } from "./modules/environment/environment.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { RateLimitModule } from "./modules/rate-limit/rate-limit.module";
import { RepositoriesModule } from "./modules/repositories/repositories.module";

@Module({
  imports: [AuthModule, EnvironmentModule, PrismaModule, RateLimitModule, RepositoriesModule],
  exports: [AuthModule, RepositoriesModule],
})
export class InfrastructureModule {}
