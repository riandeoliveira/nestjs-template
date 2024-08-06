import { PersonalRefreshToken } from "@/domain/entities/personal-refresh-token.entity";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IRepository } from "@/domain/interfaces/repository.interface";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../services/prisma.service";

@Injectable()
export class PersonalRefreshTokenRepository
  implements IRepository<PersonalRefreshToken, Prisma.PersonalRefreshTokenWhereUniqueInput>
{
  public constructor(private readonly prisma: PrismaService) {}

  public async create(personalRefreshToken: PersonalRefreshToken): Promise<void> {
    await this.prisma.personalRefreshToken.create({ data: personalRefreshToken });
  }

  public async findFirst(
    where: Prisma.PersonalRefreshTokenWhereInput,
  ): Promise<PersonalRefreshToken> {
    return await this.prisma.personalRefreshToken.findFirst({
      where,
    });
  }

  public async findOne(
    where: Prisma.PersonalRefreshTokenWhereUniqueInput,
  ): Promise<PersonalRefreshToken | null> {
    return await this.prisma.personalRefreshToken.findUnique({
      where,
    });
  }

  public async findOneOrThrow(
    where: Prisma.PersonalRefreshTokenWhereUniqueInput,
  ): Promise<PersonalRefreshToken> {
    const personalRefreshToken: PersonalRefreshToken | null = await this.findOne(where);

    if (!personalRefreshToken)
      throw new NotFoundException(ResponseMessages.PERSONAL_REFRESH_TOKEN_NOT_FOUND);

    return personalRefreshToken;
  }

  public async hardDelete(where: Prisma.PersonalRefreshTokenWhereUniqueInput): Promise<void> {
    await this.prisma.personalRefreshToken.delete({
      where,
    });
  }

  public async softDelete(where: Prisma.PersonalRefreshTokenWhereUniqueInput): Promise<void> {
    await this.prisma.personalRefreshToken.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async softDeleteMany(where: Prisma.PersonalRefreshTokenWhereInput): Promise<void> {
    await this.prisma.personalRefreshToken.updateMany({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async update(
    where: Prisma.PersonalRefreshTokenWhereUniqueInput,
    data: Partial<PersonalRefreshToken>,
  ): Promise<void> {
    await this.prisma.personalRefreshToken.update({
      where,
      data: {
        updatedAt: new Date(),
        ...data,
      },
    });
  }
}
