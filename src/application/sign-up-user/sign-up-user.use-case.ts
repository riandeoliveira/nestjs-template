import { TokenDto } from "@/domain/dtos/token.dto";
import { User } from "@/domain/entities/user.entity";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { MESSAGES } from "@/domain/messages/messages";
import { AuthService } from "@/infrastructure/modules/auth/auth.service";
import { PasswordUtility } from "@/infrastructure/utilities/password.utility";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignUpUserRequest } from "./sign-up-user.request";
import { SignUpUserResponse } from "./sign-up-user.response";

@Injectable()
export class SignUpUserUseCase implements IUseCase<SignUpUserRequest, SignUpUserResponse> {
  public constructor(
    private readonly authService: AuthService,

    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async execute(request: SignUpUserRequest): Promise<SignUpUserResponse> {
    const userAlreadyExists: boolean = !!(await this.repository.findOne({
      where: {
        email: request.email,
      },
    }));

    if (userAlreadyExists) throw new ConflictException(MESSAGES.EMAIL.ALREADY_EXISTS);

    const hashedPassword: string = await PasswordUtility.hash(request.password);

    const user: User = this.repository.create({
      email: request.email,
      password: hashedPassword,
    });

    await this.repository.save(user);

    const tokenData: TokenDto = await this.authService.generateTokenData(user);

    const { userId, accessToken, refreshToken } = tokenData;

    return {
      userId,
      accessToken,
      refreshToken,
    };
  }
}
