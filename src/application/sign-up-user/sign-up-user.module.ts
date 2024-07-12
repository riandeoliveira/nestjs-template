import { User } from "@/domain/entities/user.entity";
import { AuthModule } from "@/infrastructure/modules/auth/auth.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SignUpUserEndpoint } from "./sign-up-user.endpoint";
import { SignUpUserUseCase } from "./sign-up-user.use-case";

@Module({
  controllers: [SignUpUserEndpoint],
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  providers: [SignUpUserUseCase],
})
export class SignUpUserModule {}
