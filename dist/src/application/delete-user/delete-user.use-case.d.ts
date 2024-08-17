import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { PersonalRefreshTokenRepository } from "@/infrastructure/modules/repositories/personal-refresh-token.repository";
import { UserRepository } from "@/infrastructure/modules/repositories/user.repository";
export declare class DeleteUserUseCase implements IUseCase {
    private readonly personalRefreshTokenRepository;
    private readonly userRepository;
    constructor(personalRefreshTokenRepository: PersonalRefreshTokenRepository, userRepository: UserRepository);
    execute(): Promise<void>;
}
