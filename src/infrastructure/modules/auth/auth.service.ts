import { Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { randomUUID } from "crypto";
import { CookieOptions } from "express";
import {
  ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
  REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
} from "../../../domain/constants";
import { TokenDto } from "../../../domain/dtos/token.dto";
import { IRequest } from "../../../domain/interfaces/request.interface";
import { CurrentUserIdProvider } from "../providers/current-user-id.provider";

export class AuthService {
  public constructor(
    private readonly currentUserIdProvider: CurrentUserIdProvider,
    private readonly jwtService: JwtService,

    @Inject(REQUEST)
    private readonly request: IRequest,
  ) {}

  private getCookieOptions(expiresIn: number): CookieOptions {
    return {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: expiresIn * 1000,
    };
  }

  private sendJwtCookiesToClient(accessToken: string, refreshToken: string): void {
    const { response } = this.request;

    response.cookie(
      "access_token",
      accessToken,
      this.getCookieOptions(ACCESS_TOKEN_EXPIRATION_IN_SECONDS),
    );

    response.cookie(
      "refresh_token",
      refreshToken,
      this.getCookieOptions(REFRESH_TOKEN_EXPIRATION_IN_SECONDS),
    );
  }

  public clearJwtCookies(): void {
    const { response } = this.request;

    response.clearCookie("access_token");
    response.clearCookie("refresh_token");
  }

  public async generateTokenData(userId: string): Promise<TokenDto> {
    const payload = {
      userId,
      jti: randomUUID(),
    };

    const accessToken: string = await this.jwtService.signAsync(payload, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
    });

    const refreshToken: string = await this.jwtService.signAsync(payload, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
    });

    this.sendJwtCookiesToClient(accessToken, refreshToken);

    return {
      userId,
      accessToken: {
        value: accessToken,
        expiresIn: ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
      },
      refreshToken: {
        value: refreshToken,
        expiresIn: REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
      },
    };
  }

  public async validateTokenOrThrow(token: string): Promise<{ userId: string }> {
    const payload: { userId: string } = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    this.currentUserIdProvider.set(payload.userId);

    return payload;
  }
}
