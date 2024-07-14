import { UserDto } from "@/domain/dtos/user.dto";
import { User } from "@/domain/entities/user.entity";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { MESSAGES } from "@/domain/messages/messages";
import { AuthService } from "@/infrastructure/modules/auth/auth.service";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { PasswordUtility } from "@/infrastructure/utilities/password.utility";
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { Not } from "typeorm";
import { UpdateUserRequest } from "./update-user.request";

@Injectable()
export class UpdateUserUseCase implements IUseCase<UpdateUserRequest> {
  public constructor(
    private readonly authService: AuthService,
    private readonly repository: UserRepository,
  ) {}

  public async execute(request: UpdateUserRequest): Promise<void> {
    const isRequestEmpty: boolean = !request.email && !request.password;

    if (isRequestEmpty) throw new BadRequestException(MESSAGES.REQUEST_IS_EMPTY);

    const currentUser: UserDto = this.authService.getCurrentUser();

    const user: User = await this.repository.findOneOrThrow({
      where: {
        id: currentUser.id,
      },
    });

    if (request.email) {
      const userAlreadyExists: boolean = await this.repository.exists({
        where: {
          id: Not(currentUser.id),
          email: request.email,
        },
      });

      if (userAlreadyExists) throw new ConflictException(MESSAGES.EMAIL.ALREADY_EXISTS);

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
