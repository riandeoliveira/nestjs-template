import { TokenDto } from "@/domain/dtos/token.dto";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PasswordUtility } from "@/domain/utilities/password.utility";
import { AuthService } from "@/infrastructure/services/auth.service";
import { PrismaService } from "@/infrastructure/services/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PersonalRefreshToken, User } from "@prisma/client";
import { SignInUserRequest } from "./sign-in-user.request";
import { SignInUserResponse } from "./sign-in-user.response";

@Injectable()
export class SignInUserUseCase implements IUseCase<SignInUserRequest, SignInUserResponse> {
  public constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  public async execute(request: SignInUserRequest): Promise<SignInUserResponse> {
    const user = await this.findAuthenticatedUserByCredentials(request.email, request.password);
    const personalRefreshToken = await this.findPersonalRefreshTokenByUserId(user.id);

    await this.updatePersonalRefreshToken(personalRefreshToken);

    return await this.generateTokenDataByUserId(user.id);
  }

  private async findAuthenticatedUserByCredentials(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    });

    if (!user) throw new UnauthorizedException(ResponseMessages.INVALID_CREDENTIALS);

    const isPasswordValid: boolean = await PasswordUtility.verify(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(ResponseMessages.INVALID_CREDENTIALS);
    }

    return user;
  }

  private async findPersonalRefreshTokenByUserId(userId: string): Promise<PersonalRefreshToken> {
    return await this.prisma.personalRefreshToken.findFirstOrThrow({
      where: {
        userId,
        hasBeenUsed: false,
        deletedAt: null,
      },
    });
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

  private async updatePersonalRefreshToken(token: PersonalRefreshToken): Promise<void> {
    await this.prisma.personalRefreshToken.update({
      where: {
        ...token,
      },
      data: {
        hasBeenUsed: true,
        deletedAt: new Date(),
      },
    });
  }
}
