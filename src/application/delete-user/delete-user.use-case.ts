import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { AuthService } from "@/infrastructure/services/auth.service";
import { PrismaService } from "@/infrastructure/services/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class DeleteUserUseCase implements IUseCase {
  public constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  public async execute(): Promise<void> {
    const user = await this.findAuthenticatedUser();

    await this.updateUser(user);
  }

  private async findAuthenticatedUser(): Promise<User> {
    const id: string = this.authService.getCurrentUserId();

    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  private async updateUser(user: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        ...user,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
