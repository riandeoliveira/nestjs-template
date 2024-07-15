import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { IsNull } from "typeorm";

@Injectable()
export class VerifyCurrentUserUseCase implements IUseCase {
  public constructor(
    private readonly authService: AuthService,
    private readonly repository: UserRepository,
  ) {}

  public async execute(): Promise<void> {
    const id: string = this.authService.getCurrentUserId();

    const userExists: boolean = await this.repository.exists({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });

    if (!userExists) throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
  }
}
