import { JwtUtility } from "@/domain/utilities/jwt.utility";
import { ApiProperty } from "@/infrastructure/decorators/api-property.decorator";
import { faker } from "@faker-js/faker";

export abstract class ExpirableTokenDto {
  @ApiProperty("value", JwtUtility.generateFakeAccessToken())
  public readonly value: string;

  @ApiProperty("expires_in", faker.number.int(10000000))
  public readonly expiresIn: number;
}
