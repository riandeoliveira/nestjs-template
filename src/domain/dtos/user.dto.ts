import { FakeData } from "@/infrastructure/abstractions/fake-data.abstraction";
import { ApiProperty } from "@/infrastructure/decorators/api-property.decorator";

export abstract class UserDto {
  @ApiProperty("email", FakeData.email())
  public readonly email: string;

  @ApiProperty("password", FakeData.strongPassword())
  public readonly password: string;
}
