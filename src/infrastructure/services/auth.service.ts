import { TokenDto } from "@/domain/dtos/token.dto";
import { UserDto } from "@/domain/dtos/user.dto";
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

  public getCurrentUser(): UserDto {
    return this.request.user;
  }

  public async generateTokenData(payload: UserDto): Promise<TokenDto> {
    const expirationInSeconds = {
      accessToken: 20,
      refreshToken: 40,
    };

    const accessToken: string = await this.jwtService.signAsync(payload, {
      expiresIn: expirationInSeconds.accessToken,
    });
    const refreshToken: string = await this.jwtService.signAsync(payload, {
      expiresIn: expirationInSeconds.refreshToken,
    });

    return {
      userId: payload.id,
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
