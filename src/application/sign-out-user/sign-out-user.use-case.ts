import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { PrismaService } from "@/infrastructure/services/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SignOutUserUseCase implements IUseCase {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(): Promise<void> {
    // FIXME: solta erro 500 se tentar deslogar mais de uma vez

    const user = await this.userRepository.findCurrent();

    const personalRefreshToken = await this.prisma.personalRefreshToken.findFirstOrThrow({
      where: {
        userId: user.id,
        hasBeenUsed: false,
        deletedAt: null,
      },
    });

    await this.prisma.personalRefreshToken.update({
      where: personalRefreshToken,
      data: {
        hasBeenUsed: true,
        deletedAt: new Date(),
      },
    });
  }
}
