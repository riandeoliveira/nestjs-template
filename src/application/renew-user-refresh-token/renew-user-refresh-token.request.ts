import { FakeData } from "../../infrastructure/abstractions/fake-data.abstraction";
import { ApiProperty } from "../../infrastructure/decorators/api-property.decorator";
import { HasExactLength } from "../../infrastructure/decorators/has-exact-length.decorator";
import { IsRequired } from "../../infrastructure/decorators/is-required.decorator";
import { IsString } from "../../infrastructure/decorators/is-string.decorator";
import { Trim } from "../../infrastructure/decorators/trim.decorator";

export abstract class RenewUserRefreshTokenRequest {
  @ApiProperty("refresh_token", FakeData.accessToken())
  @HasExactLength(252, "REFRESH_TOKEN_LENGTH")
  @IsRequired("REFRESH_TOKEN_IS_REQUIRED")
  @IsString("REFRESH_TOKEN_IS_STRING")
  @Trim()
  public readonly refreshToken: string;
}
