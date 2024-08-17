import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { AuthService } from "@/infrastructure/modules/auth/auth.service";
import { PersonalRefreshTokenRepository } from "@/infrastructure/modules/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/modules/repositories/user.repository";
import { SignInUserRequest } from "./sign-in-user.request";
import { SignInUserResponse } from "./sign-in-user.response";
export declare class SignInUserUseCase implements IUseCase<SignInUserRequest, SignInUserResponse> {
    private readonly authService;
    private readonly personalRefreshTokenRepository;
    private readonly userRepository;
    constructor(authService: AuthService, personalRefreshTokenRepository: PersonalRefreshTokenRepository, userRepository: UserRepository);
    execute(request: SignInUserRequest): Promise<SignInUserResponse>;
}
