import { TokenDto } from "@/domain/dtos/token.dto";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PasswordUtility } from "@/domain/utilities/password.utility";
import { AuthService } from "@/infrastructure/services/auth.service";
import { PrismaService } from "@/infrastructure/services/prisma.service";
import { ConflictException, Injectable } from "@nestjs/common";
import { SignUpUserRequest } from "./sign-up-user.request";
import { SignUpUserResponse } from "./sign-up-user.response";

@Injectable()
export class SignUpUserUseCase implements IUseCase<SignUpUserRequest, SignUpUserResponse> {
  public constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  public async execute(request: SignUpUserRequest): Promise<SignUpUserResponse> {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email: request.email,
      },
    });

    if (userAlreadyExists) throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXISTS);

    const hashedPassword: string = await PasswordUtility.hash(request.password);

    const user = await this.prisma.user.create({
      data: {
        email: request.email,
        password: hashedPassword,
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
