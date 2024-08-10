import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { UserRepository } from "@/infrastructure/modules/repositories/user.repository";
export declare class VerifyCurrentUserUseCase implements IUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(): Promise<void>;
}
