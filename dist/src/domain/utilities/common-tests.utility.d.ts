import { TokenDto } from "../dtos/token.dto";
import { HttpMethodsKey } from "../enums/http-methods.enum";
type AuthenticateReturnType = {
    accessToken: string;
    email: string;
    password: string;
    signUpUserBody: TokenDto;
};
export declare class CommonTestsUtility {
    private readonly method;
    private readonly path;
    constructor(method: HttpMethodsKey, path: string);
    authenticate(): Promise<AuthenticateReturnType>;
    includeAuthenticationTest(): void;
    includeRateLimitTest(): void;
    private requestBy;
}
export {};
