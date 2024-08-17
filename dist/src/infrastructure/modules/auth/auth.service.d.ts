import { TokenDto } from "@/domain/dtos/token.dto";
import { IRequest } from "@/domain/interfaces/request.interface";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly jwtService;
    private readonly request;
    constructor(jwtService: JwtService, request: IRequest);
    generateTokenData(userId: string): Promise<TokenDto>;
    getCurrentUserId(): string;
    validateTokenOrThrow(token: string): Promise<boolean>;
}
