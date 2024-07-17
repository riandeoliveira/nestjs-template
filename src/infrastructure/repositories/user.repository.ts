import { UserDto } from "@/domain/dtos/user.dto";
import { User } from "@/domain/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { BaseRepository } from "./base.repository";

@Injectable()
export class UserRepository extends BaseRepository<User, UserDto> {
  public constructor(protected readonly repository: EntityManager) {
    super(User, repository);
  }
}
