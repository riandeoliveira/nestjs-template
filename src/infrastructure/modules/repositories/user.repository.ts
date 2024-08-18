import { User } from "../../../domain/entities/user.entity";
import { ResponseMessages } from "../../../domain/enums/response-messages.enum";
import { IUserRepository } from "../../../domain/interfaces/user-repository.interface";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { AuthService } from "../auth/auth.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserRepository implements IUserRepository {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  public async create(user: User): Promise<void> {
    await this.prisma.user.create({ data: user });
  }

  public async findCurrentOrThrow(): Promise<User> {
    const userId: string = this.authService.getCurrentUserId();

    return await this.findOneOrThrow({ id: userId, deletedAt: null });
  }

  public async findFirst(where: Prisma.UserWhereInput): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where,
    });
  }

  public async findFirstOrThrow(where: Prisma.UserWhereInput): Promise<User> {
    const personalRefreshToken: User | null = await this.findFirst(where);

    if (!personalRefreshToken)
      throw new NotFoundException(ResponseMessages.PERSONAL_REFRESH_TOKEN_NOT_FOUND);

    return personalRefreshToken;
  }

  public async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where,
    });
  }

  public async findOneOrThrow(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user: User | null = await this.findOne(where);

    if (!user) throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);

    return user;
  }

  public async hardDelete(where: Prisma.UserWhereUniqueInput): Promise<void> {
    await this.prisma.user.delete({
      where,
    });
  }

  public async softDelete(where: Prisma.UserWhereUniqueInput): Promise<void> {
    await this.prisma.user.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async softDeleteMany(where: Prisma.UserWhereInput): Promise<void> {
    await this.prisma.user.updateMany({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async update(where: Prisma.UserWhereUniqueInput, data: Partial<User>): Promise<void> {
    const { id, ...rest } = data;

    await this.prisma.user.update({
      where,
      data: {
        updatedAt: new Date(),
        ...rest,
      },
    });
  }
}
