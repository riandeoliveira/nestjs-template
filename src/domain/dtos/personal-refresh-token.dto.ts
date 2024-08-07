import { FakeData } from "@/infrastructure/abstractions/fake-data.abstraction";
import { ApiProperty } from "@/infrastructure/decorators/api-property.decorator";
import { User } from "@prisma/client";
import { JwtUtility } from "../utilities/jwt.utility";

export abstract class PersonalRefreshTokenDto {
  @ApiProperty("value", JwtUtility.generateFakeAccessToken())
  public readonly value: string;

  @ApiProperty("expires_in", FakeData.integer(10000000))
  public readonly expiresIn: number;

  // @ApiProperty("user_id", FakeData.uuid())
  // public readonly userId: string;

  public readonly user: User;
}
