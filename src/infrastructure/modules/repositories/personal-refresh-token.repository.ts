import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PersonalRefreshToken } from "../../../domain/entities/personal-refresh-token.entity";
import { ResponseMessages } from "../../../domain/enums/response-messages.enum";
import { IPersonalRefreshTokenRepository } from "../../../domain/interfaces/personal-refresh-token-repository.interface";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PersonalRefreshTokenRepository implements IPersonalRefreshTokenRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(personalRefreshToken: PersonalRefreshToken): Promise<void> {
    try {
      await this.prisma.personalRefreshToken.create({ data: personalRefreshToken });
    } catch {
      throw new InternalServerErrorException(ResponseMessages.PERSONAL_REFRESH_TOKEN_CREATE_ERROR);
    }
  }

  public async findFirst(
    where: Prisma.PersonalRefreshTokenWhereInput,
  ): Promise<PersonalRefreshToken | null> {
    return await this.prisma.personalRefreshToken.findFirst({
      where,
    });
  }

  public async findFirstOrThrow(
    where: Prisma.PersonalRefreshTokenWhereInput,
  ): Promise<PersonalRefreshToken> {
    const personalRefreshToken: PersonalRefreshToken | null = await this.findFirst(where);

    if (!personalRefreshToken) {
      throw new NotFoundException(ResponseMessages.PERSONAL_REFRESH_TOKEN_NOT_FOUND);
    }

    return personalRefreshToken;
  }

  public async findOne(
    where: Prisma.PersonalRefreshTokenWhereUniqueInput,
  ): Promise<PersonalRefreshToken | null> {
    try {
      return await this.prisma.personalRefreshToken.findUnique({
        where,
      });
    } catch {
      throw new InternalServerErrorException(ResponseMessages.PERSONAL_REFRESH_TOKEN_READ_ERROR);
    }
  }

  public async findOneOrThrow(
    where: Prisma.PersonalRefreshTokenWhereUniqueInput,
  ): Promise<PersonalRefreshToken> {
    const personalRefreshToken: PersonalRefreshToken | null = await this.findOne(where);

    if (!personalRefreshToken) {
      throw new NotFoundException(ResponseMessages.PERSONAL_REFRESH_TOKEN_NOT_FOUND);
    }

    return personalRefreshToken;
  }

  public async hardDelete(where: Prisma.PersonalRefreshTokenWhereUniqueInput): Promise<void> {
    try {
      await this.prisma.personalRefreshToken.delete({
        where,
      });
    } catch {
      throw new InternalServerErrorException(ResponseMessages.PERSONAL_REFRESH_TOKEN_DELETE_ERROR);
    }
  }

  public async softDelete(where: Prisma.PersonalRefreshTokenWhereUniqueInput): Promise<void> {
    try {
      await this.prisma.personalRefreshToken.update({
        where,
        data: {
          deletedAt: new Date(),
        },
      });
    } catch {
      throw new InternalServerErrorException(ResponseMessages.PERSONAL_REFRESH_TOKEN_DELETE_ERROR);
    }
  }

  public async softDeleteMany(where: Prisma.PersonalRefreshTokenWhereInput): Promise<void> {
    try {
      await this.prisma.personalRefreshToken.updateMany({
        where,
        data: {
          deletedAt: new Date(),
        },
      });
    } catch {
      throw new InternalServerErrorException(ResponseMessages.PERSONAL_REFRESH_TOKEN_DELETE_ERROR);
    }
  }

  public async update(
    where: Prisma.PersonalRefreshTokenWhereUniqueInput,
    data: Partial<PersonalRefreshToken>,
  ): Promise<void> {
    const { id, ...rest } = data;

    try {
      await this.prisma.personalRefreshToken.update({
        where,
        data: {
          updatedAt: new Date(),
          ...rest,
        },
      });
    } catch {
      throw new InternalServerErrorException(ResponseMessages.PERSONAL_REFRESH_TOKEN_UPDATE_ERROR);
    }
  }
}
