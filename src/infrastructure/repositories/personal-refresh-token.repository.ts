import { PersonalRefreshToken } from "@/domain/entities/personal-refresh-token.entity";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../services/prisma.service";

@Injectable()
export class PersonalRefreshTokenRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(personalRefreshToken: PersonalRefreshToken): Promise<void> {
    await this.prisma.personalRefreshToken.create({ data: personalRefreshToken });
  }

  public async findFirstWhere(
    conditions: Prisma.PersonalRefreshTokenWhereInput,
  ): Promise<PersonalRefreshToken> {
    return await this.prisma.personalRefreshToken.findFirst({
      where: conditions,
    });
  }

  public async softDeleteMany(conditions: Prisma.PersonalRefreshTokenWhereInput): Promise<void> {
    await this.prisma.personalRefreshToken.updateMany({
      where: conditions,
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async update(
    conditions: Prisma.PersonalRefreshTokenWhereUniqueInput,
    data: Partial<PersonalRefreshToken>,
  ): Promise<void> {
    await this.prisma.personalRefreshToken.update({
      where: conditions,
      data: {
        updatedAt: new Date(),
        ...data,
      },
    });
  }
}
