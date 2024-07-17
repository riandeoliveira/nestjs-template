import { ApiProperty } from "@/infrastructure/decorators/api-property.decorator";
import { faker } from "@faker-js/faker";

export abstract class UserDto {
  @ApiProperty("email", faker.internet.email())
  public readonly email: string;

  @ApiProperty("password", faker.internet.password({ prefix: "$0" }))
  public readonly password: string;
}
