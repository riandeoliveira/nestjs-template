import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { randomUUID } from "crypto";
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

    // const response = this.request.response;

    // response.cookie("access_token", accessToken, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: ACCESS_TOKEN_EXPIRATION_IN_SECONDS * 1000,
    // });

    // response.cookie("refresh_token", refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: REFRESH_TOKEN_EXPIRATION_IN_SECONDS * 1000,
    // });

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
