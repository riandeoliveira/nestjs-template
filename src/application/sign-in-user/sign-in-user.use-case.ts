import { Injectable, UnauthorizedException } from "@nestjs/common";
import { TokenDto } from "../../domain/dtos/token.dto";
import { PersonalRefreshToken } from "../../domain/entities/personal-refresh-token.entity";
import { User } from "../../domain/entities/user.entity";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { IUseCase } from "../../domain/interfaces/use-case.interface";
import { PasswordUtility } from "../../domain/utilities/password.utility";
import { AuthService } from "../../infrastructure/modules/auth/auth.service";
import { PersonalRefreshTokenRepository } from "../../infrastructure/modules/repositories/personal-refresh-token.repository";
import { UserRepository } from "../../infrastructure/modules/repositories/user.repository";
import { SignInUserRequest } from "./sign-in-user.request";
import { SignInUserResponse } from "./sign-in-user.response";

@Injectable()
export class SignInUserUseCase implements IUseCase<SignInUserRequest, SignInUserResponse> {
  public constructor(
    private readonly authService: AuthService,
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(request: SignInUserRequest): Promise<SignInUserResponse> {
    const user: User | null = await this.userRepository.findOne({
      email: request.email,
      deletedAt: null,
    });

    if (!user) throw new UnauthorizedException(ResponseMessages.INVALID_CREDENTIALS);

    const isPasswordValid: boolean = await PasswordUtility.verify(request.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(ResponseMessages.INVALID_CREDENTIALS);
    }

    const currentPersonalRefreshToken: PersonalRefreshToken =
      await this.personalRefreshTokenRepository.findFirstOrThrow({
        userId: user.id,
        hasBeenUsed: false,
        deletedAt: null,
      });

    await this.personalRefreshTokenRepository.update(currentPersonalRefreshToken, {
      hasBeenUsed: true,
    });

    const tokenData: TokenDto = await this.authService.generateTokenData(user.id);

    const { value, expiresIn } = tokenData.refreshToken;

    const personalRefreshToken = new PersonalRefreshToken({
      value,
      expiresIn,
      userId: user.id,
    });

    await this.personalRefreshTokenRepository.create(personalRefreshToken);

    return tokenData;
  }
}
