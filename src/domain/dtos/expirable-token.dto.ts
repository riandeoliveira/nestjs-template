import { JwtUtility } from "@/domain/utilities/jwt.utility";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";

export abstract class ExpirableTokenDto {
  @ApiProperty({
    name: "value",
    example: JwtUtility.generateFakeAccessToken(),
  })
  public readonly value: string;

  @ApiProperty({
    name: "expires_in",
    example: faker.number.int(10000000),
  })
  public readonly expiresIn: number;
}
