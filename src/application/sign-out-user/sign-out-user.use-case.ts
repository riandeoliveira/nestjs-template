import { User } from "@/domain/entities/user.entity";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PersonalRefreshTokenRepository } from "@/infrastructure/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { Injectable } from "@nestjs/common";
import { IsNull } from "typeorm";

@Injectable()
export class SignOutUserUseCase implements IUseCase {
  public constructor(
    private readonly authService: AuthService,
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly repository: UserRepository,
  ) {}

  public async execute(): Promise<void> {
    // FIXME: solta erro 500 se tentar deslogar mais de uma vez

    const id: string = this.authService.getCurrentUserId();

    const user: User = await this.repository.findOneOrThrow(
      {
        where: {
          id,
          deletedAt: IsNull(),
        },
      },
      "USER_NOT_FOUND",
    );

    const personalRefreshToken = await this.personalRefreshTokenRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        hasBeenUsed: false,
        deletedAt: IsNull(),
      },
    });

    personalRefreshToken.hasBeenUsed = true;

    await this.personalRefreshTokenRepository.update(personalRefreshToken);
    await this.personalRefreshTokenRepository.save(personalRefreshToken);
  }
}
