import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { Injectable } from "@nestjs/common";
import { IsNull } from "typeorm";

@Injectable()
export class VerifyCurrentUserUseCase implements IUseCase {
  public constructor(
    private readonly authService: AuthService,
    private readonly repository: UserRepository,
  ) {}

  public async execute(): Promise<void> {
    const id: string = this.authService.getCurrentUserId();

    await this.repository.existsOrThrow(
      {
        where: {
          id,
          deletedAt: IsNull(),
        },
      },
      "USER_NOT_FOUND",
    );
  }
}
