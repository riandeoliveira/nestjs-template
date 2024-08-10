import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { AuthService } from "@/infrastructure/modules/auth/auth.service";
import { PersonalRefreshTokenRepository } from "@/infrastructure/modules/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/modules/repositories/user.repository";
import { SignUpUserRequest } from "./sign-up-user.request";
import { SignUpUserResponse } from "./sign-up-user.response";
export declare class SignUpUserUseCase implements IUseCase<SignUpUserRequest, SignUpUserResponse> {
    private readonly authService;
    private readonly personalRefreshTokenRepository;
    private readonly userRepository;
    constructor(authService: AuthService, personalRefreshTokenRepository: PersonalRefreshTokenRepository, userRepository: UserRepository);
    execute(request: SignUpUserRequest): Promise<SignUpUserResponse>;
}
