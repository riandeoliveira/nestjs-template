import { FakeData } from "@/infrastructure/abstractions/fake-data.abstraction";
import { ApiProperty } from "@/infrastructure/decorators/api-property.decorator";

export abstract class ExpirableTokenDto {
  @ApiProperty("value", FakeData.accessToken())
  public readonly value: string;

  @ApiProperty("expires_in", FakeData.integer(10000000))
  public readonly expiresIn: number;
}
