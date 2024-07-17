import { ApiProperty } from "@/infrastructure/decorators/api-property.decorator";
import { faker } from "@faker-js/faker";
import { JwtUtility } from "../utilities/jwt.utility";
import { User } from "../entities/user.entity";

export abstract class PersonalRefreshTokenDto {
  @ApiProperty("value", JwtUtility.generateFakeAccessToken())
  public readonly value: string;

  @ApiProperty("expires_in", faker.number.int(10000000))
  public readonly expiresIn: number;

  // @ApiProperty("user_id", faker.string.uuid())
  // public readonly userId: string;

  public readonly user: User;
}
