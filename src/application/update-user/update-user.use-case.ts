import { TokenDto } from "@/domain/dtos/token.dto";
import { PersonalRefreshToken } from "@/domain/entities/personal-refresh-token.entity";
import { User } from "@/domain/entities/user.entity";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PasswordUtility } from "@/domain/utilities/password.utility";
import { PersonalRefreshTokenRepository } from "@/infrastructure/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { UpdateUserRequest } from "./update-user.request";

@Injectable()
export class UpdateUserUseCase implements IUseCase<UpdateUserRequest> {
  public constructor(
    private readonly authService: AuthService,
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(request: UpdateUserRequest): Promise<void> {
    const isRequestEmpty: boolean = !request.email && !request.password;

    if (isRequestEmpty) throw new BadRequestException(ResponseMessages.REQUEST_IS_EMPTY);

    const user: User = await this.userRepository.findCurrent();

    if (request.email) {
      const existingUser = await this.userRepository.findFirst({
        id: {
          not: user.id,
        },
        email: request.email,
      });

      if (existingUser) throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXISTS);

      user.email = request.email;
    }

    if (request.password) {
      const hashedPassword: string = await PasswordUtility.hash(request.password);

      user.password = hashedPassword;
    }

    await this.userRepository.update(
      {
        id: user.id,
        deletedAt: null,
      },
      user,
    );

    const currentPersonalRefreshToken = await this.personalRefreshTokenRepository.findFirst({
      userId: user.id,
      hasBeenUsed: false,
      deletedAt: null,
    });

    await this.personalRefreshTokenRepository.update(currentPersonalRefreshToken, {
      hasBeenUsed: true,
    });

    const tokenData: TokenDto = await this.authService.generateTokenData(user.id);

    const { value, expiresIn } = tokenData.refreshToken;

    const personalRefreshToken = new PersonalRefreshToken({
      value,
      expiresIn,
      userId: user.id,
    });

    await this.personalRefreshTokenRepository.create(personalRefreshToken);
  }
}
