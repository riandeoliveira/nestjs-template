import { ApiProperty } from "@/infrastructure/decorators/api-property.decorator";
import { faker } from "@faker-js/faker";
import { ExpirableTokenDto } from "./expirable-token.dto";

export abstract class TokenDto {
  @ApiProperty("user_id", faker.string.uuid())
  public readonly userId: string;

  @ApiProperty("access_token")
  public readonly accessToken: ExpirableTokenDto;

  @ApiProperty("refresh_token")
  public readonly refreshToken: ExpirableTokenDto;
}
