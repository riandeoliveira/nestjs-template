import { ConflictException, Injectable } from "@nestjs/common";
import { TokenDto } from "../../domain/dtos/token.dto";
import { PersonalRefreshToken } from "../../domain/entities/personal-refresh-token.entity";
import { User } from "../../domain/entities/user.entity";
import { ResponseMessages } from "../../domain/enums/response-messages.enum";
import { IUseCase } from "../../domain/interfaces/use-case.interface";
import { AuthService } from "../../infrastructure/modules/auth/auth.service";
import { PersonalRefreshTokenRepository } from "../../infrastructure/modules/repositories/personal-refresh-token.repository";
import { UserRepository } from "../../infrastructure/modules/repositories/user.repository";
import { PasswordUtility } from "../../infrastructure/utilities/password.utility";
import { SignUpUserRequest } from "./sign-up-user.request";

@Injectable()
export class SignUpUserUseCase implements IUseCase<SignUpUserRequest> {
  public constructor(
    private readonly authService: AuthService,
    private readonly personalRefreshTokenRepository: PersonalRefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(request: SignUpUserRequest): Promise<void> {
    const userAlreadyExists: User | null = await this.userRepository.findOne({
      email: request.email,
    });

    if (userAlreadyExists) throw new ConflictException(ResponseMessages.EMAIL_ALREADY_EXISTS);

    const hashedPassword: string = await PasswordUtility.hash(request.password);

    const user = new User({
      email: request.email,
      password: hashedPassword,
    });

    await this.userRepository.create(user);

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
