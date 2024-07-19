import { TokenDto } from "@/domain/dtos/token.dto";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PasswordUtility } from "@/domain/utilities/password.utility";
import { AuthService } from "@/infrastructure/services/auth.service";
import { PrismaService } from "@/infrastructure/services/prisma.service";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateUserRequest } from "./update-user.request";

@Injectable()
export class UpdateUserUseCase implements IUseCase<UpdateUserRequest> {
  public constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  public async execute(request: UpdateUserRequest): Promise<void> {
    const isRequestEmpty: boolean = !request.email && !request.password;

    if (isRequestEmpty) throw new BadRequestException(ResponseMessages.REQUEST_IS_EMPTY);

    const id: string = this.authService.getCurrentUserId();

    const user = await this.prisma.user.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!user) throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);

    if (request.email) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          id: {
            not: id,
          },
          email: request.email,
        },
      });

      if (existingUser) throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXISTS);

      user.email = request.email;
    }

    if (request.password) {
      const hashedPassword: string = await PasswordUtility.hash(request.password);

      user.password = hashedPassword;
    }

    user.updatedAt = new Date();

    await this.prisma.user.update({
      where: {
        id: user.id,
        deletedAt: null,
      },
      data: {
        ...user,
      },
    });

    const personalRefreshToken = await this.prisma.personalRefreshToken.findFirst({
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
  }
}
