import { TokenDto } from "@/domain/dtos/token.dto";
import { PersonalRefreshToken } from "@/domain/entities/personal-refresh-token.entity";
import { User } from "@/domain/entities/user.entity";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PasswordUtility } from "@/domain/utilities/password.utility";
import { AuthService } from "@/infrastructure/modules/auth/auth.service";
import { PersonalRefreshTokenRepository } from "@/infrastructure/modules/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/modules/repositories/user.repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ResetUserPasswordRequest } from "./reset-user-password.request";
import { ResetUserPasswordResponse } from "./reset-user-password.response";

@Injectable()
export class ResetUserPasswordUseCase
  implements IUseCase<ResetUserPasswordRequest, ResetUserPasswordResponse>
{
  public constructor(
    private readonly authService: AuthService,
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(request: ResetUserPasswordRequest): Promise<ResetUserPasswordResponse> {
    if (request.password !== request.passwordConfirmation) {
      throw new BadRequestException(ResponseMessages.PASSWORDS_ARE_EQUIVALENT);
    }

    const user: User = await this.userRepository.findCurrentOrThrow();

    const hashedPassword: string = await PasswordUtility.hash(request.password);

    user.password = hashedPassword;

    const { id, ...rest } = user;

    await this.userRepository.update(
      {
        id: user.id,
        deletedAt: null,
      },
      rest,
    );

    const currentPersonalRefreshToken: PersonalRefreshToken =
      await this.personalRefreshTokenRepository.findFirstOrThrow({
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

    return tokenData;
  }
}
