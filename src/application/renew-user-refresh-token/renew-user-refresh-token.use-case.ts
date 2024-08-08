import { TokenDto } from "@/domain/dtos/token.dto";
import { PersonalRefreshToken } from "@/domain/entities/personal-refresh-token.entity";
import { User } from "@/domain/entities/user.entity";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PersonalRefreshTokenRepository } from "@/infrastructure/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RenewUserRefreshTokenRequest } from "./renew-user-refresh-token.request";
import { RenewUserRefreshTokenResponse } from "./renew-user-refresh-token.response";

@Injectable()
export class RenewUserRefreshTokenUseCase
  implements IUseCase<RenewUserRefreshTokenRequest, RenewUserRefreshTokenResponse>
{
  public constructor(
    private readonly authService: AuthService,
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(
    request: RenewUserRefreshTokenRequest,
  ): Promise<RenewUserRefreshTokenResponse> {
    await this.authService.validateTokenOrThrow(request.refreshToken);

    const user: User = await this.userRepository.findCurrentOrThrow();

    const currentPersonalRefreshToken: PersonalRefreshToken =
      await this.personalRefreshTokenRepository.findOneOrThrow({
        value: request.refreshToken,
        deletedAt: null,
      });

    if (currentPersonalRefreshToken.hasBeenUsed) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED_OPERATION);
    }

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
