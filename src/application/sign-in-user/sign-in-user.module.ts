import { User } from "@/domain/entities/user.entity";
import { AuthModule } from "@/infrastructure/modules/auth/auth.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SignInUserEndpoint } from "./sign-in-user.endpoint";
import { SignInUserUseCase } from "./sign-in-user.use-case";

@Module({
  controllers: [SignInUserEndpoint],
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  providers: [SignInUserUseCase],
})
export class SignInUserModule {}
