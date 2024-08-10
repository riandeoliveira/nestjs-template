import { User } from "@/domain/entities/user.entity";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PasswordUtility } from "@/domain/utilities/password.utility";
import { UserRepository } from "@/infrastructure/modules/repositories/user.repository";
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { UpdateUserRequest } from "./update-user.request";

@Injectable()
export class UpdateUserUseCase implements IUseCase<UpdateUserRequest> {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute(request: UpdateUserRequest): Promise<void> {
    const isRequestEmpty: boolean = !request.email && !request.password;

    if (isRequestEmpty) throw new BadRequestException(ResponseMessages.REQUEST_IS_EMPTY);

    const user: User = await this.userRepository.findCurrentOrThrow();

    const userEmail: string = user.email;

    if (request.email) {
      const existingUser: User | null = await this.userRepository.findFirst({
        id: {
          not: user.id,
        },
        email: request.email,
      });

      if (existingUser) throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXISTS);

      user.email = request.email;
    }

    if (request.password) {
      const hashedPassword: string = await PasswordUtility.hash(request.password);

      user.password = hashedPassword;
    }

    const { id, ...rest } = user;

    await this.userRepository.update(
      {
        id: user.id,
        deletedAt: null,
      },
      rest,
    );
  }
}
