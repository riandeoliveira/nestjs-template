import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { JwtUtility } from "@/domain/utilities/jwt.utility";
import { ApiProperty } from "@/infrastructure/decorators/api-property.decorator";
import { Trim } from "@/infrastructure/decorators/trim.decorator";
import { IsNotEmpty, IsString, Length } from "class-validator";

export abstract class RenewUserRefreshTokenRequest {
  @ApiProperty("refresh_token", JwtUtility.generateFakeAccessToken())
  @IsNotEmpty({ message: ResponseMessages.REFRESH_TOKEN_IS_REQUIRED })
  @IsString({ message: ResponseMessages.REFRESH_TOKEN_IS_STRING })
  @Length(192, 192, { message: ResponseMessages.REFRESH_TOKEN_LENGTH })
  @Trim()
  public readonly refreshToken: string;
}
