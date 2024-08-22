import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { IUseCase } from "../../domain/interfaces/use-case.interface";
import { AuthService } from "../../infrastructure/modules/auth/auth.service";
import { PersonalRefreshTokenRepository } from "../../infrastructure/modules/repositories/personal-refresh-token.repository";
import { UserRepository } from "../../infrastructure/modules/repositories/user.repository";

@Injectable()
export class DeleteUserUseCase implements IUseCase {
  public constructor(
    private readonly authService: AuthService,
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(): Promise<void> {
    const user: User = await this.userRepository.findCurrentOrThrow();

    await this.userRepository.softDelete(user);

    await this.personalRefreshTokenRepository.softDeleteMany({
      userId: user.id,
    });

    this.authService.clearJwtCookies();
  }
}
