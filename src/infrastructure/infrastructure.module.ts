import { DomainModule } from "@/domain/domain.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "path";
import { PersonalRefreshTokenRepository } from "./repositories/personal-refresh-token.repository";
import { UserRepository } from "./repositories/user.repository";
import { AuthService } from "./services/auth.service";

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
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: process.env.DATABASE_SOURCE,
      synchronize: process.env.NODE_ENV === "development",
      entities: [path.join(__dirname, "/../domain/entities/**.entity{.ts,.js}")],
    }),
  ],
  providers: [AuthService, UserRepository, PersonalRefreshTokenRepository],
  exports: [AuthService, UserRepository, PersonalRefreshTokenRepository],
})
export class InfrastructureModule {}
