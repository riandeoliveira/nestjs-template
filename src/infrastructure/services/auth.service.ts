import { TokenDto } from "@/domain/dtos/token.dto";
import { IAuthService } from "@/domain/interfaces/auth-service.interface";
import { IRequest } from "@/domain/interfaces/request.interface";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable({ scope: Scope.REQUEST })
export class AuthService implements IAuthService {
  public constructor(
    private readonly jwtService: JwtService,

    @Inject(REQUEST)
    private readonly request: IRequest,
  ) {}

  public async generateTokenData(userId: string): Promise<TokenDto> {
    const expirationInSeconds = {
      accessToken: 3600, // 1 hour
      refreshToken: 604800, // 7 days
    };

    const payload = { userId };

    const accessToken: string = await this.jwtService.signAsync(payload, {
      expiresIn: expirationInSeconds.accessToken,
    });
    const refreshToken: string = await this.jwtService.signAsync(payload, {
      expiresIn: expirationInSeconds.refreshToken,
    });

    return {
      userId,
      accessToken: {
        value: accessToken,
        expiresIn: expirationInSeconds.accessToken,
      },
      refreshToken: {
        value: refreshToken,
        expiresIn: expirationInSeconds.refreshToken,
      },
    };
  }

  public getCurrentUserId(): string {
    return this.request.currentUserId;
  }

  public async validateTokenOrThrow(token: string): Promise<void> {
    await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
