import { TokenDto } from "@/domain/dtos/token.dto";
import { User } from "@/domain/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  public constructor(private readonly jwtService: JwtService) {}

  public async generateTokenData(user: User): Promise<TokenDto> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken: string = await this.jwtService.signAsync(payload, { expiresIn: "1d" });
    const refreshToken: string = await this.jwtService.signAsync(payload, { expiresIn: "7d" });

    return {
      userId: user.id,
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
