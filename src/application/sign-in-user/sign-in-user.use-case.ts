import { TokenDto } from "@/domain/dtos/token.dto";
import { User } from "@/domain/entities/user.entity";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PasswordUtility } from "@/domain/utilities/password.utility";
import { PersonalRefreshTokenRepository } from "@/infrastructure/repositories/personal-refresh-token.repository";
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
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly repository: UserRepository,
  ) {}

  public async execute(request: SignInUserRequest): Promise<SignInUserResponse> {
    const user: User | null = await this.repository.findOne({
      where: {
        email: request.email,
        deletedAt: IsNull(),
      },
    });

    if (!user) throw new UnauthorizedException(ResponseMessages.INVALID_CREDENTIALS);

    const isPasswordValid: boolean = await PasswordUtility.verify(request.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(ResponseMessages.INVALID_CREDENTIALS);
    }

    const personalRefreshToken = await this.personalRefreshTokenRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        hasBeenUsed: false,
        deletedAt: IsNull(),
      },
    });

    personalRefreshToken.hasBeenUsed = true;

    await this.personalRefreshTokenRepository.update(personalRefreshToken);
    await this.personalRefreshTokenRepository.save(personalRefreshToken);

    const tokenData: TokenDto = await this.authService.generateTokenData(user.id);

    const { value, expiresIn } = tokenData.refreshToken;

    const newPersonalRefreshToken = this.personalRefreshTokenRepository.create({
      value,
      expiresIn,
      user,
    });

    await this.personalRefreshTokenRepository.save(newPersonalRefreshToken);

    return tokenData;
  }
}
