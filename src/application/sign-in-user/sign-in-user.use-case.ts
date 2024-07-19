import { TokenDto } from "@/domain/dtos/token.dto";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PasswordUtility } from "@/domain/utilities/password.utility";
import { AuthService } from "@/infrastructure/services/auth.service";
import { PrismaService } from "@/infrastructure/services/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignInUserRequest } from "./sign-in-user.request";
import { SignInUserResponse } from "./sign-in-user.response";

@Injectable()
export class SignInUserUseCase implements IUseCase<SignInUserRequest, SignInUserResponse> {
  public constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  public async execute(request: SignInUserRequest): Promise<SignInUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: request.email,
        deletedAt: null,
      },
    });

    if (!user) throw new UnauthorizedException(ResponseMessages.INVALID_CREDENTIALS);

    const isPasswordValid: boolean = await PasswordUtility.verify(request.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(ResponseMessages.INVALID_CREDENTIALS);
    }

    const personalRefreshToken = await this.prisma.personalRefreshToken.findFirstOrThrow({
      where: {
        userId: user.id,
        hasBeenUsed: false,
        deletedAt: null,
      },
    });

    await this.prisma.personalRefreshToken.update({
      where: {
        ...personalRefreshToken,
      },
      data: {
        hasBeenUsed: true,
        updatedAt: new Date(),
      },
    });

    const tokenData: TokenDto = await this.authService.generateTokenData(user.id);

    const { value, expiresIn } = tokenData.refreshToken;

    await this.prisma.personalRefreshToken.create({
      data: {
        value,
        expiresIn,
        userId: user.id,
      },
    });

    return tokenData;
  }
}
