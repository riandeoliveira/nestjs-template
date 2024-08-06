import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PersonalRefreshTokenRepository } from "@/infrastructure/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteUserUseCase implements IUseCase {
  public constructor(
    private readonly authService: AuthService,
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(): Promise<void> {
    const id: string = this.authService.getCurrentUserId();

    const user = await this.userRepository.findOneOrThrow({
      id,
      deletedAt: null,
    });

    await this.userRepository.softDelete(user);

    await this.personalRefreshTokenRepository.softDeleteMany({
      userId: user.id,
    });
  }
}
