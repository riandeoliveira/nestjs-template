import { UpdateUserRequest } from "./update-user.request";
import { UpdateUserUseCase } from "./update-user.use-case";
export declare class UpdateUserEndpoint {
    private readonly useCase;
    constructor(useCase: UpdateUserUseCase);
    handle(request: UpdateUserRequest): Promise<void>;
}
