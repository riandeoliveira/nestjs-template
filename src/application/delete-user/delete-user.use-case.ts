import { User } from "@/domain/entities/user.entity";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PersonalRefreshTokenRepository } from "@/infrastructure/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteUserUseCase implements IUseCase {
  public constructor(
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(): Promise<void> {
    const user: User = await this.userRepository.findCurrent();

    await this.userRepository.softDelete(user);

    await this.personalRefreshTokenRepository.softDeleteMany({
      userId: user.id,
    });
  }
}
