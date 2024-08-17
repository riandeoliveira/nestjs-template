import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { AuthService } from "@/infrastructure/modules/auth/auth.service";
import { PersonalRefreshTokenRepository } from "@/infrastructure/modules/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/modules/repositories/user.repository";
import { RenewUserRefreshTokenRequest } from "./renew-user-refresh-token.request";
import { RenewUserRefreshTokenResponse } from "./renew-user-refresh-token.response";
export declare class RenewUserRefreshTokenUseCase implements IUseCase<RenewUserRefreshTokenRequest, RenewUserRefreshTokenResponse> {
    private readonly authService;
    private readonly personalRefreshTokenRepository;
    private readonly userRepository;
    constructor(authService: AuthService, personalRefreshTokenRepository: PersonalRefreshTokenRepository, userRepository: UserRepository);
    execute(request: RenewUserRefreshTokenRequest): Promise<RenewUserRefreshTokenResponse>;
}
