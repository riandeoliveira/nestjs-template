import { ResetUserPasswordRequest } from "./reset-user-password.request";
import { ResetUserPasswordResponse } from "./reset-user-password.response";
import { ResetUserPasswordUseCase } from "./reset-user-password.use-case";
export declare class ResetUserPasswordEndpoint {
    private readonly useCase;
    constructor(useCase: ResetUserPasswordUseCase);
    handle(request: ResetUserPasswordRequest): Promise<ResetUserPasswordResponse>;
}
