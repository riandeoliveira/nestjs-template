import { IUseCase } from "@/domain/interfaces/use-case.interface";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { AuthService } from "@/infrastructure/services/auth.service";
import { Injectable } from "@nestjs/common";
import { IsNull } from "typeorm";
import { RenewUserRefreshTokenRequest } from "./renew-user-refresh-token.request";
import { RenewUserRefreshTokenResponse } from "./renew-user-refresh-token.response";

@Injectable()
export class RenewUserRefreshTokenUseCase
  implements IUseCase<RenewUserRefreshTokenRequest, RenewUserRefreshTokenResponse>
{
  public constructor(
    private readonly authService: AuthService,
    private readonly repository: UserRepository,
  ) {}

  public async execute(
    request: RenewUserRefreshTokenRequest,
  ): Promise<RenewUserRefreshTokenResponse> {
    await this.authService.validateTokenOrThrow(request.refreshToken);

    const id: string = this.authService.getCurrentUserId();

    await this.repository.existsOrThrow(
      {
        where: {
          id,
          deletedAt: IsNull(),
        },
      },
      "USER_NOT_FOUND",
    );

    return await this.authService.generateTokenData(id);
  }
}
