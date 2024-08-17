import { SignUpUserRequest } from "./sign-up-user.request";
import { SignUpUserResponse } from "./sign-up-user.response";
import { SignUpUserUseCase } from "./sign-up-user.use-case";
export declare class SignUpUserEndpoint {
    private readonly useCase;
    constructor(useCase: SignUpUserUseCase);
    handle(request: SignUpUserRequest): Promise<SignUpUserResponse>;
}
