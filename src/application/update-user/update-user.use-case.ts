import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PasswordUtility } from "@/domain/utilities/password.utility";
import { AuthService } from "@/infrastructure/services/auth.service";
import { PrismaService } from "@/infrastructure/services/prisma.service";
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
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

    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
        deletedAt: null,
      },
    });

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

      await this.prisma.user.update({
        where: {
          ...existingUser,
        },
        data: {
          email: request.email,
          deletedAt: new Date(),
        },
      });
    }

    if (request.password) {
      const hashedPassword: string = await PasswordUtility.hash(request.password);

      await this.prisma.user.update({
        where: {
          ...user,
        },
        data: {
          password: hashedPassword,
          deletedAt: new Date(),
        },
      });
    }
  }
}
