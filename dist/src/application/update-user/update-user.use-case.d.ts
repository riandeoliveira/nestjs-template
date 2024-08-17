import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { UserRepository } from "@/infrastructure/modules/repositories/user.repository";
import { UpdateUserRequest } from "./update-user.request";
export declare class UpdateUserUseCase implements IUseCase<UpdateUserRequest> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(request: UpdateUserRequest): Promise<void>;
}
