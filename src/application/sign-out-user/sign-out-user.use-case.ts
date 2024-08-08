import { PersonalRefreshToken } from "@/domain/entities/personal-refresh-token.entity";
import { User } from "@/domain/entities/user.entity";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PersonalRefreshTokenRepository } from "@/infrastructure/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SignOutUserUseCase implements IUseCase {
  public constructor(
    private readonly personalRefershTokenRepository: PersonalRefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(): Promise<void> {
    const user: User = await this.userRepository.findCurrentOrThrow();

    const personalRefreshToken: PersonalRefreshToken =
      await this.personalRefershTokenRepository.findFirstOrThrow({
        userId: user.id,
        hasBeenUsed: false,
        deletedAt: null,
      });

    await this.personalRefershTokenRepository.update(personalRefreshToken, {
      hasBeenUsed: true,
    });
  }
}
