import { TokenDto } from "@/domain/dtos/token.dto";
import { IRequest } from "@/domain/interfaces/request.interface";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  public constructor(
    private readonly jwtService: JwtService,

    @Inject(REQUEST)
    private readonly request: IRequest,
  ) {}

  public getCurrentUserId(): string {
    return this.request.currentUserId;
  }

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
}
