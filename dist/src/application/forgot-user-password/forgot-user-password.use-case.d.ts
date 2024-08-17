import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { AuthService } from "@/infrastructure/modules/auth/auth.service";
import { MailService } from "@/infrastructure/modules/mail/mail.service";
import { UserRepository } from "@/infrastructure/modules/repositories/user.repository";
import { ForgotUserPasswordRequest } from "./forgot-user-password.request";
export declare class ForgotUserPasswordUseCase implements IUseCase<ForgotUserPasswordRequest> {
    private readonly authService;
    private readonly mailService;
    private readonly userRepository;
    constructor(authService: AuthService, mailService: MailService, userRepository: UserRepository);
    execute(request: ForgotUserPasswordRequest): Promise<void>;
}
