import { TokenDto } from "@/domain/dtos/token.dto";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { AuthService } from "@/infrastructure/services/auth.service";
import { PrismaService } from "@/infrastructure/services/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PersonalRefreshToken, User } from "@prisma/client";
import { RenewUserRefreshTokenRequest } from "./renew-user-refresh-token.request";
import { RenewUserRefreshTokenResponse } from "./renew-user-refresh-token.response";

@Injectable()
export class RenewUserRefreshTokenUseCase
  implements IUseCase<RenewUserRefreshTokenRequest, RenewUserRefreshTokenResponse>
{
  public constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  public async execute(
    request: RenewUserRefreshTokenRequest,
  ): Promise<RenewUserRefreshTokenResponse> {
    await this.authService.validateTokenOrThrow(request.refreshToken);

    const user = await this.findAuthenticatedUser();
    const personalRefreshToken = await this.findUnusedPersonalRefreshTokenByValue(
      request.refreshToken,
    );

    await this.updatePersonalRefreshToken(personalRefreshToken);

    return await this.generateTokenDataByUserId(user.id);
  }

  private async generateTokenDataByUserId(userId: string): Promise<TokenDto> {
    const tokenData: TokenDto = await this.authService.generateTokenData(userId);

    const { value, expiresIn } = tokenData.refreshToken;

    await this.prisma.personalRefreshToken.create({
      data: {
        value,
        expiresIn,
        userId,
      },
    });

    return tokenData;
  }

  private async findAuthenticatedUser(): Promise<User> {
    const id: string = this.authService.getCurrentUserId();

    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  private async findUnusedPersonalRefreshTokenByValue(
    value: string,
  ): Promise<PersonalRefreshToken> {
    const personalRefreshToken = await this.prisma.personalRefreshToken.findUniqueOrThrow({
      where: {
        value,
        deletedAt: null,
      },
    });

    if (personalRefreshToken.hasBeenUsed) {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED_OPERATION);
    }

    return personalRefreshToken;
  }

  private async updatePersonalRefreshToken(token: PersonalRefreshToken): Promise<void> {
    await this.prisma.personalRefreshToken.update({
      where: {
        ...token,
      },
      data: {
        hasBeenUsed: true,
        updatedAt: new Date(),
      },
    });
  }
}
