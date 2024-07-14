import { User } from "@/domain/entities/user.entity";
import { AuthModule } from "@/infrastructure/modules/auth/auth.module";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeleteUserEndpoint } from "./delete-user.endpoint";
import { DeleteUserUseCase } from "./delete-user.use-case";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [DeleteUserEndpoint],
  providers: [DeleteUserUseCase, UserRepository],
})
export class DeleteUserModule {}
