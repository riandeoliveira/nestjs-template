// NOTE: to implement

import { TokenDto } from "@/domain/dtos/token.dto";
import { User } from "@/domain/entities/user.entity";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { MESSAGES } from "@/domain/messages/messages";
import { AuthService } from "@/infrastructure/modules/auth/auth.service";
import { PasswordUtility } from "@/infrastructure/utilities/password.utility";
import { UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignInUserRequest } from "./sign-in-user.request";
import { SignInUserResponse } from "./sign-in-user.response";

export class SignInUserUseCase implements IUseCase<SignInUserRequest, SignInUserResponse> {
  public constructor(
    private readonly authService: AuthService,

    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async execute(request: SignInUserRequest): Promise<SignInUserResponse> {
    const user: User | null = await this.repository.findOne({
      where: {
        email: request.email,
        deletedAt: null,
      },
    });

    if (!user) throw new UnauthorizedException(MESSAGES.EMAIL.IS_NOT_REGISTERED);

    const isPasswordValid: boolean = await PasswordUtility.verify(request.password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException(MESSAGES.INVALID_LOGIN_CREDENTIALS);

    const tokenData: TokenDto = await this.authService.generateTokenData(user);

    const { userId, accessToken, refreshToken } = tokenData;

    return {
      userId,
      accessToken,
      refreshToken,
    };
  }
}
