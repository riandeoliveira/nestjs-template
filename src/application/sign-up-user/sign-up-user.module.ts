import { User } from "@/domain/entities/user.entity";
import { AuthModule } from "@/infrastructure/modules/auth/auth.module";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SignUpUserEndpoint } from "./sign-up-user.endpoint";
import { SignUpUserUseCase } from "./sign-up-user.use-case";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [SignUpUserEndpoint],
  providers: [SignUpUserUseCase, UserRepository],
})
export class SignUpUserModule {}
