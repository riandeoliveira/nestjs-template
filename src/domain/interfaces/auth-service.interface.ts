import { TokenDto } from "../dtos/token.dto";

export interface IAuthService {
  generateTokenData(userId: string): Promise<TokenDto>;

  getCurrentUserId(): string;

  validateTokenOrThrow(token: string): Promise<boolean>;
}
