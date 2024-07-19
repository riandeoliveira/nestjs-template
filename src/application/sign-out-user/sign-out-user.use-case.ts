import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { AuthService } from "@/infrastructure/services/auth.service";
import { PrismaService } from "@/infrastructure/services/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SignOutUserUseCase implements IUseCase {
  public constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  public async execute(): Promise<void> {
    // FIXME: solta erro 500 se tentar deslogar mais de uma vez

    const id: string = this.authService.getCurrentUserId();

    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
        deletedAt: null,
      },
    });

    const personalRefreshToken = await this.prisma.personalRefreshToken.findFirstOrThrow({
      where: {
        userId: user.id,
        hasBeenUsed: false,
        deletedAt: null,
      },
    });

    await this.prisma.personalRefreshToken.update({
      where: {
        ...personalRefreshToken,
      },
      data: {
        hasBeenUsed: true,
        deletedAt: new Date(),
      },
    });
  }
}
