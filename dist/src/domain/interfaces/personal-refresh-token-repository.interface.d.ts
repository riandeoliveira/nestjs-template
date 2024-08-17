import { Prisma } from "@prisma/client";
import { PersonalRefreshToken } from "../entities/personal-refresh-token.entity";
import { IRepository } from "./repository.interface";
export interface IPersonalRefreshTokenRepository extends IRepository<PersonalRefreshToken, Prisma.PersonalRefreshTokenWhereUniqueInput> {
}
