import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { JwtUtility } from "@/domain/utilities/jwt.utility";
import { Trim } from "@/infrastructure/decorators/trim.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, Length } from "class-validator";

export abstract class RenewUserRefreshTokenRequest {
  @ApiProperty({
    name: "refresh_token",
    example: JwtUtility.generateFakeAccessToken(),
  })
  @Expose({ name: "refresh_token" })
  @IsNotEmpty({ message: ResponseMessages.REFRESH_TOKEN_IS_REQUIRED })
  @IsString({ message: ResponseMessages.REFRESH_TOKEN_IS_STRING })
  @Length(192, 192, { message: ResponseMessages.REFRESH_TOKEN_LENGTH })
  @Trim()
  public readonly refreshToken: string;
}
