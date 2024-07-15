import { User } from "@/domain/entities/user.entity";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PasswordUtility } from "@/domain/utilities/password.utility";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { ConflictException, Injectable } from "@nestjs/common";
import { SignUpUserRequest } from "./sign-up-user.request";
import { SignUpUserResponse } from "./sign-up-user.response";

@Injectable()
export class SignUpUserUseCase implements IUseCase<SignUpUserRequest, SignUpUserResponse> {
  public constructor(
    private readonly authService: AuthService,
    private readonly repository: UserRepository,
  ) {}

  public async execute(request: SignUpUserRequest): Promise<SignUpUserResponse> {
    const userAlreadyExists: boolean = await this.repository.exists({
      where: {
        email: request.email,
      },
    });

    if (userAlreadyExists) throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXISTS);

    const hashedPassword: string = await PasswordUtility.hash(request.password);

    const user: User = this.repository.create({
      email: request.email,
      password: hashedPassword,
    });

    await this.repository.save(user);

    return await this.authService.generateTokenData(user.id);
  }
}
