import { PersonalRefreshTokenDto } from "@/domain/dtos/personal-refresh-token.dto";
import { PersonalRefreshToken } from "@/domain/entities/personal-refresh-token.entity";
import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { BaseRepository } from "./base.repository";

@Injectable()
export class PersonalRefreshTokenRepository extends BaseRepository<
  PersonalRefreshToken,
  PersonalRefreshTokenDto
> {
  public constructor(protected readonly repository: EntityManager) {
    super(PersonalRefreshToken, repository);
  }
}
