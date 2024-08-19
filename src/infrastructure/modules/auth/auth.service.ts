import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { randomUUID } from "crypto";
import { CookieOptions, response } from "express";
import {
  ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
  REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
} from "../../../domain/constants";
import { TokenDto } from "../../../domain/dtos/token.dto";
import { IRequest } from "../../../domain/interfaces/request.interface";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  public constructor(
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
    response.clearCookie("access_token", this.getCookieOptions(ACCESS_TOKEN_EXPIRATION_IN_SECONDS));

    response.clearCookie(
      "refresh_token",
      this.getCookieOptions(REFRESH_TOKEN_EXPIRATION_IN_SECONDS),
    );
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

  public getCurrentUserId(): string {
    return this.request.currentUserId;
  }

  public async validateTokenOrThrow(token: string): Promise<boolean> {
    await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    return true;
  }
}
