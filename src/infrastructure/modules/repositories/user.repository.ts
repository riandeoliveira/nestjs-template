import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { User } from "../../../domain/entities/user.entity";
import { ResponseMessages } from "../../../domain/enums/response-messages.enum";
import { IUserRepository } from "../../../domain/interfaces/user-repository.interface";
import { PrismaService } from "../prisma/prisma.service";
import { CurrentUserIdProvider } from "../providers/current-user-id.provider";

@Injectable()
export class UserRepository implements IUserRepository {
  public constructor(
    private readonly currentUserIdProvider: CurrentUserIdProvider,
    private readonly prisma: PrismaService,
  ) {}

  public async create(user: User): Promise<void> {
    try {
      await this.prisma.user.create({ data: user });
    } catch {
      throw new InternalServerErrorException(ResponseMessages.USER_CREATE_ERROR);
    }
  }

  public async findCurrentOrThrow(): Promise<User> {
    const userId: string | null = this.currentUserIdProvider.get();

    return await this.findOneOrThrow({ id: userId, deletedAt: null });
  }

  public async findFirst(where: Prisma.UserWhereInput): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where,
    });
  }

  public async findFirstOrThrow(where: Prisma.UserWhereInput): Promise<User> {
    const user: User | null = await this.findFirst(where);

    if (!user) {
      throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
    }

    return user;
  }

  public async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where,
      });
    } catch {
      throw new InternalServerErrorException(ResponseMessages.USER_READ_ERROR);
    }
  }

  public async findOneOrThrow(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user: User | null = await this.findOne(where);

    if (!user) throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);

    return user;
  }

  public async hardDelete(where: Prisma.UserWhereUniqueInput): Promise<void> {
    try {
      await this.prisma.user.delete({
        where,
      });
    } catch {
      throw new InternalServerErrorException(ResponseMessages.USER_DELETE_ERROR);
    }
  }

  public async softDelete(where: Prisma.UserWhereUniqueInput): Promise<void> {
    try {
      await this.prisma.user.update({
        where,
        data: {
          deletedAt: new Date(),
        },
      });
    } catch {
      throw new InternalServerErrorException(ResponseMessages.USER_DELETE_ERROR);
    }
  }

  public async softDeleteMany(where: Prisma.UserWhereInput): Promise<void> {
    try {
      await this.prisma.user.updateMany({
        where,
        data: {
          deletedAt: new Date(),
        },
      });
    } catch {
      throw new InternalServerErrorException(ResponseMessages.USER_DELETE_ERROR);
    }
  }

  public async update(where: Prisma.UserWhereUniqueInput, data: Partial<User>): Promise<void> {
    const { id, ...rest } = data;

    try {
      await this.prisma.user.update({
        where,
        data: {
          updatedAt: new Date(),
          ...rest,
        },
      });
    } catch {
      throw new InternalServerErrorException(ResponseMessages.USER_UPDATE_ERROR);
    }
  }
}
