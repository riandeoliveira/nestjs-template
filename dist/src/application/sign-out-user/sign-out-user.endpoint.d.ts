import { SignOutUserUseCase } from "./sign-out-user.use-case";
export declare class SignOutUserEndpoint {
    private readonly useCase;
    constructor(useCase: SignOutUserUseCase);
    handle(): Promise<void>;
}
