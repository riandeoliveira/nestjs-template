import { RenewUserRefreshTokenRequest } from "./renew-user-refresh-token.request";
import { RenewUserRefreshTokenResponse } from "./renew-user-refresh-token.response";
import { RenewUserRefreshTokenUseCase } from "./renew-user-refresh-token.use-case";
export declare class RenewUserRefreshTokenEndpoint {
    private readonly useCase;
    constructor(useCase: RenewUserRefreshTokenUseCase);
    handle(request: RenewUserRefreshTokenRequest): Promise<RenewUserRefreshTokenResponse>;
}
