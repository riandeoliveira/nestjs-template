import { User } from "@/domain/entities/user.entity";
import { AuthModule } from "@/infrastructure/modules/auth/auth.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UpdateUserEndpoint } from "./update-user.endpoint";
import { UpdateUserUseCase } from "./update-user.use-case";
import { UserRepository } from "@/infrastructure/repositories/user.repository";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UpdateUserEndpoint],
  providers: [UpdateUserUseCase, UserRepository],
})
export class UpdateUserModule {}
