import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { MailModule } from "./modules/mail/mail.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { RateLimitModule } from "./modules/rate-limit/rate-limit.module";
import { RepositoriesModule } from "./modules/repositories/repositories.module";

@Module({
  imports: [AuthModule, MailModule, PrismaModule, RateLimitModule, RepositoriesModule],
  exports: [AuthModule, MailModule, RepositoriesModule],
})
export class InfrastructureModule {}
