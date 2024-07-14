import { User } from "@/domain/entities/user.entity";
import { AuthModule } from "@/infrastructure/modules/auth/auth.module";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SignInUserEndpoint } from "./sign-in-user.endpoint";
import { SignInUserUseCase } from "./sign-in-user.use-case";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [SignInUserEndpoint],
  providers: [SignInUserUseCase, UserRepository],
})
export class SignInUserModule {}
