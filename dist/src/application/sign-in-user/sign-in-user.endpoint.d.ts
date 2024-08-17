import { SignInUserRequest } from "./sign-in-user.request";
import { SignInUserResponse } from "./sign-in-user.response";
import { SignInUserUseCase } from "./sign-in-user.use-case";
export declare class SignInUserEndpoint {
    private readonly useCase;
    constructor(useCase: SignInUserUseCase);
    handle(request: SignInUserRequest): Promise<SignInUserResponse>;
}
