import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { AuthService } from "@/infrastructure/services/auth.service";
import { PrismaService } from "@/infrastructure/services/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VerifyCurrentUserUseCase implements IUseCase {
  public constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  public async execute(): Promise<void> {
    const id: string = this.authService.getCurrentUserId();

    await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
