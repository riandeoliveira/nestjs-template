import { DeleteUserUseCase } from "./delete-user.use-case";
export declare class DeleteUserEndpoint {
    private readonly useCase;
    constructor(useCase: DeleteUserUseCase);
    handle(): Promise<void>;
}
