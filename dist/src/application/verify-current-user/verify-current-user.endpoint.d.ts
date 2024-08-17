import { VerifyCurrentUserUseCase } from "./verify-current-user.use-case";
export declare class VerifyCurrentUserEndpoint {
    private readonly useCase;
    constructor(useCase: VerifyCurrentUserUseCase);
    handle(): Promise<void>;
}
