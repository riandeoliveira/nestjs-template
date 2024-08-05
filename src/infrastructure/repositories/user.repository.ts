import { User } from "@/domain/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../services/prisma.service";

@Injectable()
export class UserRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(user: User): Promise<void> {
    await this.prisma.user.create({ data: user });
  }

  public async findFirstWhere(conditions: Prisma.UserWhereInput): Promise<User> {
    return await this.prisma.user.findFirst({
      where: conditions,
    });
  }

  public async findOneWhere(conditions: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.findUnique({
      where: conditions,
    });
  }

  public async softDelete(conditions: Prisma.UserWhereUniqueInput): Promise<void> {
    await this.prisma.user.update({
      where: conditions,
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async update(conditions: Prisma.UserWhereUniqueInput, data: Partial<User>): Promise<void> {
    await this.prisma.user.update({
      where: conditions,
      data: {
        updatedAt: new Date(),
        ...data,
      },
    });
  }
}
