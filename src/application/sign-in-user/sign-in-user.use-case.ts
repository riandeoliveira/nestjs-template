import { TokenDto } from "@/domain/dtos/token.dto";
import { User } from "@/domain/entities/user.entity";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { MESSAGES } from "@/domain/messages/messages";
import { PasswordUtility } from "@/domain/utilities/password.utility";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IsNull } from "typeorm";
import { SignInUserRequest } from "./sign-in-user.request";
import { SignInUserResponse } from "./sign-in-user.response";

@Injectable()
export class SignInUserUseCase implements IUseCase<SignInUserRequest, SignInUserResponse> {
  public constructor(
    private readonly authService: AuthService,
    private readonly repository: UserRepository,
  ) {}

  public async execute(request: SignInUserRequest): Promise<SignInUserResponse> {
    const user: User | null = await this.repository.findOne({
      where: {
        email: request.email,
        deletedAt: IsNull(),
      },
    });

    if (!user) throw new UnauthorizedException(MESSAGES.INVALID_LOGIN_CREDENTIALS);

    const isPasswordValid: boolean = await PasswordUtility.verify(request.password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException(MESSAGES.INVALID_LOGIN_CREDENTIALS);

    const { id, email } = user;

    const tokenData: TokenDto = await this.authService.generateTokenData({
      id,
      email,
    });

    return tokenData;
  }
}
