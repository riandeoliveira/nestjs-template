import { UserDto } from "@/domain/dtos/user.dto";
import { User } from "@/domain/entities/user.entity";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { Injectable } from "@nestjs/common";
import { IsNull } from "typeorm";

@Injectable()
export class DeleteUserUseCase implements IUseCase {
  public constructor(
    private readonly authService: AuthService,
    private readonly repository: UserRepository,
  ) {}

  public async execute(): Promise<void> {
    const currentUser: UserDto = this.authService.getCurrentUser();

    const user: User = await this.repository.findOneOrThrow(
      {
        where: {
          id: currentUser.id,
          deletedAt: IsNull(),
        },
      },
      "USER_NOT_FOUND",
    );

    await this.repository.softDelete(user);
  }
}
