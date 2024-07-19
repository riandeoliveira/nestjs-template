import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { AuthService } from "@/infrastructure/services/auth.service";
import { PrismaService } from "@/infrastructure/services/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteUserUseCase implements IUseCase {
  public constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  public async execute(): Promise<void> {
    const id: string = this.authService.getCurrentUserId();

    const user = await this.prisma.user.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!user) throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);

    await this.prisma.user.update({
      where: {
        ...user,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    await this.prisma.personalRefreshToken.updateMany({
      where: {
        userId: user.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
