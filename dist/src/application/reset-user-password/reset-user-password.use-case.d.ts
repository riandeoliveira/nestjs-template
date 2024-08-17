import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { AuthService } from "@/infrastructure/modules/auth/auth.service";
import { PersonalRefreshTokenRepository } from "@/infrastructure/modules/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/modules/repositories/user.repository";
import { ResetUserPasswordRequest } from "./reset-user-password.request";
import { ResetUserPasswordResponse } from "./reset-user-password.response";
export declare class ResetUserPasswordUseCase implements IUseCase<ResetUserPasswordRequest, ResetUserPasswordResponse> {
    private readonly authService;
    private readonly personalRefreshTokenRepository;
    private readonly userRepository;
    constructor(authService: AuthService, personalRefreshTokenRepository: PersonalRefreshTokenRepository, userRepository: UserRepository);
    execute(request: ResetUserPasswordRequest): Promise<ResetUserPasswordResponse>;
}
