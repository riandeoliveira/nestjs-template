import { DomainModule } from "@/domain/domain.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./services/auth.service";
import { PrismaService } from "./services/prisma.service";

@Module({
  imports: [
    DomainModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, PrismaService],
  exports: [AuthService, PrismaService],
})
export class InfrastructureModule {}
