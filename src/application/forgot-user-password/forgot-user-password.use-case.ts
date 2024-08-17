import { TokenDto } from "@/domain/dtos/token.dto";
import { User } from "@/domain/entities/user.entity";
import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { AuthService } from "@/infrastructure/modules/auth/auth.service";
import { MailService } from "@/infrastructure/modules/mail/mail.service";
import { UserRepository } from "@/infrastructure/modules/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { ForgotUserPasswordRequest } from "./forgot-user-password.request";

@Injectable()
export class ForgotUserPasswordUseCase implements IUseCase<ForgotUserPasswordRequest> {
  public constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(request: ForgotUserPasswordRequest): Promise<void> {
    const user: User = await this.userRepository.findOneOrThrow({
      email: request.email,
      deletedAt: null,
    });

    const tokenData: TokenDto = await this.authService.generateTokenData(user.id);

    await this.mailService.sendMail({
      from: process.env.MAIL_SENDER,
      to: user.email,
      subject: "Password Reset Request",
      template: "./forgot-user-password.template.hbs",
      context: {
        model: {
          email: user.email,
          accessToken: tokenData.accessToken.value,
          clientUrl: process.env.CLIENT_URL,
        },
      },
    });
  }
}
