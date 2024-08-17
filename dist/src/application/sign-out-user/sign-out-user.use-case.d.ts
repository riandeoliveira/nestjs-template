import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PersonalRefreshTokenRepository } from "@/infrastructure/modules/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/modules/repositories/user.repository";
export declare class SignOutUserUseCase implements IUseCase {
    private readonly personalRefershTokenRepository;
    private readonly userRepository;
    constructor(personalRefershTokenRepository: PersonalRefreshTokenRepository, userRepository: UserRepository);
    execute(): Promise<void>;
}
