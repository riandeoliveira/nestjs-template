import { User } from "@/domain/entities/user.entity";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PasswordUtility } from "@/domain/utilities/password.utility";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { IsNull, Not } from "typeorm";
import { UpdateUserRequest } from "./update-user.request";

@Injectable()
export class UpdateUserUseCase implements IUseCase<UpdateUserRequest> {
  public constructor(
    private readonly authService: AuthService,
    private readonly repository: UserRepository,
  ) {}

  public async execute(request: UpdateUserRequest): Promise<void> {
    const isRequestEmpty: boolean = !request.email && !request.password;

    if (isRequestEmpty) throw new BadRequestException(ResponseMessages.REQUEST_IS_EMPTY);

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

    if (request.email) {
      const userAlreadyExists: boolean = await this.repository.exists({
        where: {
          id: Not(id),
          email: request.email,
        },
      });

      if (userAlreadyExists) throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXISTS);

      user.email = request.email;
    }

    if (request.password) {
      const hashedPassword: string = await PasswordUtility.hash(request.password);

      user.password = hashedPassword;
    }

    await this.repository.update(user);
    await this.repository.save(user);
  }
}
