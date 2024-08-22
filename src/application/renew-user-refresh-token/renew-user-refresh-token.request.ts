import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { ApiProperty } from "../../infrastructure/decorators/api-property.decorator";
import { HasExactLength } from "../../infrastructure/decorators/has-exact-length.decorator";
import { IsRequired } from "../../infrastructure/decorators/is-required.decorator";
import { Trim } from "../../infrastructure/decorators/trim.decorator";

export class RenewUserRefreshTokenRequest {
  @ApiProperty("refresh_token", FakeData.accessToken())
  @HasExactLength(252, "REFRESH_TOKEN_LENGTH")
  @IsRequired("REFRESH_TOKEN_IS_REQUIRED")
  @Trim()
  public readonly refreshToken: string;

  public constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
