import { DomainModule } from "@/domain/domain.module";
import { User } from "@/domain/entities/user.entity";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
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
      secret: "secret",
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: process.env.DATABASE_SOURCE,
      synchronize: process.env.NODE_ENV === "development",
      entities: [User],
    }),
  ],
  providers: [AuthService, UserRepository],
  exports: [AuthService, UserRepository],
})
export class InfrastructureModule {}
