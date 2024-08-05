import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PersonalRefreshTokenRepository } from "@/infrastructure/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteUserUseCase implements IUseCase {
  public constructor(
    private readonly authService: AuthService,
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(): Promise<void> {
    const id: string = this.authService.getCurrentUserId();

    const user = await this.userRepository.findOneWhere({
      id,
      deletedAt: null,
    });

    if (!user) throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);

    await this.userRepository.softDelete(user);

    await this.personalRefreshTokenRepository.softDeleteMany({
      userId: user.id,
    });
  }
}
