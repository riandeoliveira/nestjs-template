import { Injectable, UnauthorizedException } from "@nestjs/common";
import { TokenDto } from "../../domain/dtos/token.dto";
import { PersonalRefreshToken } from "../../domain/entities/personal-refresh-token.entity";
import { User } from "../../domain/entities/user.entity";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { IUseCase } from "../../domain/interfaces/use-case.interface";
import { AuthService } from "../../infrastructure/modules/auth/auth.service";
import { PersonalRefreshTokenRepository } from "../../infrastructure/modules/repositories/personal-refresh-token.repository";
import { UserRepository } from "../../infrastructure/modules/repositories/user.repository";
import { RenewUserRefreshTokenRequest } from "./renew-user-refresh-token.request";

@Injectable()
export class RenewUserRefreshTokenUseCase implements IUseCase<RenewUserRefreshTokenRequest> {
  public constructor(
    private readonly authService: AuthService,
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(request: RenewUserRefreshTokenRequest): Promise<void> {
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
  }
}
