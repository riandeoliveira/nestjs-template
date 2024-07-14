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
    const accessToken: string = await this.jwtService.signAsync(payload, { expiresIn: "1d" });
    const refreshToken: string = await this.jwtService.signAsync(payload, { expiresIn: "7d" });

    return {
      userId: payload.id,
      accessToken: {
        value: accessToken,
        expiresIn: 86400000,
      },
      refreshToken: {
        value: refreshToken,
        expiresIn: 604800000,
      },
    };
  }
}
