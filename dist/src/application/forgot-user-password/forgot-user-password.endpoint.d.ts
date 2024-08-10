import { ForgotUserPasswordRequest } from "./forgot-user-password.request";
import { ForgotUserPasswordUseCase } from "./forgot-user-password.use-case";
export declare class ForgotUserPasswordEndpoint {
    private readonly useCase;
    constructor(useCase: ForgotUserPasswordUseCase);
    handle(request: ForgotUserPasswordRequest): Promise<void>;
}
