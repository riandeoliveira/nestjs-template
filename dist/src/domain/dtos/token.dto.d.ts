import { ExpirableTokenDto } from "./expirable-token.dto";
export declare abstract class TokenDto {
    readonly userId: string;
    readonly accessToken: ExpirableTokenDto;
    readonly refreshToken: ExpirableTokenDto;
}
