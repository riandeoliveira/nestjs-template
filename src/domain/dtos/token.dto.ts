import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { ExpirableTokenDto } from "./expirable-token.dto";

export abstract class TokenDto {
  @ApiProperty({
    name: "user_id",
    example: faker.string.uuid(),
  })
  public readonly userId: string;

  @ApiProperty({
    name: "access_token",
  })
  public readonly accessToken: ExpirableTokenDto;

  @ApiProperty({
    name: "refresh_token",
  })
  public readonly refreshToken: ExpirableTokenDto;
}
