import { TokenDto } from "@/domain/dtos/token.dto";
import { User } from "@/domain/entities/user.entity";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PersonalRefreshTokenRepository } from "@/infrastructure/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IsNull } from "typeorm";
import { RenewUserRefreshTokenRequest } from "./renew-user-refresh-token.request";
import { RenewUserRefreshTokenResponse } from "./renew-user-refresh-token.response";

@Injectable()
export class RenewUserRefreshTokenUseCase
  implements IUseCase<RenewUserRefreshTokenRequest, RenewUserRefreshTokenResponse>
{
  public constructor(
    private readonly authService: AuthService,
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly repository: UserRepository,
  ) {}

  public async execute(
    request: RenewUserRefreshTokenRequest,
  ): Promise<RenewUserRefreshTokenResponse> {
    await this.authService.validateTokenOrThrow(request.refreshToken);

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

    const personalRefreshToken = await this.personalRefreshTokenRepository.findOne({
      where: {
        value: request.refreshToken,
        deletedAt: IsNull(),
      },
    });

    if (personalRefreshToken.hasBeenUsed) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED_OPERATION);
    }

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