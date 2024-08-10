import { PersonalRefreshToken } from "@/domain/entities/personal-refresh-token.entity";
import { IPersonalRefreshTokenRepository } from "@/domain/interfaces/personal-refresh-token-repository.interface";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
export declare class PersonalRefreshTokenRepository implements IPersonalRefreshTokenRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(personalRefreshToken: PersonalRefreshToken): Promise<void>;
    findFirst(where: Prisma.PersonalRefreshTokenWhereInput): Promise<PersonalRefreshToken | null>;
    findFirstOrThrow(where: Prisma.PersonalRefreshTokenWhereInput): Promise<PersonalRefreshToken>;
    findOne(where: Prisma.PersonalRefreshTokenWhereUniqueInput): Promise<PersonalRefreshToken | null>;
    findOneOrThrow(where: Prisma.PersonalRefreshTokenWhereUniqueInput): Promise<PersonalRefreshToken>;
    hardDelete(where: Prisma.PersonalRefreshTokenWhereUniqueInput): Promise<void>;
    softDelete(where: Prisma.PersonalRefreshTokenWhereUniqueInput): Promise<void>;
    softDeleteMany(where: Prisma.PersonalRefreshTokenWhereInput): Promise<void>;
    update(where: Prisma.PersonalRefreshTokenWhereUniqueInput, data: Partial<PersonalRefreshToken>): Promise<void>;
}
