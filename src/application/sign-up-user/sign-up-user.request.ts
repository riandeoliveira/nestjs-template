import { FakeData } from "@/infrastructure/abstractions/fake-data.abstraction";
import { ApiProperty } from "@/infrastructure/decorators/api-property.decorator";
import { HasMaxLength } from "@/infrastructure/decorators/has-max-length.decorator";
import { HasMinLength } from "@/infrastructure/decorators/has-min-length.decorator";
import { IsEmail } from "@/infrastructure/decorators/is-email.decorator";
import { IsRequired } from "@/infrastructure/decorators/is-required.decorator";
import { IsString } from "@/infrastructure/decorators/is-string.decorator";
import { IsStrongPassword } from "@/infrastructure/decorators/is-strong-password.decorator";
import { Trim } from "@/infrastructure/decorators/trim.decorator";

export abstract class SignUpUserRequest {
  @ApiProperty("email", FakeData.email())
  @HasMaxLength(64, "EMAIL_HAS_MAXIMUM_LENGTH")
  @HasMinLength(8, "EMAIL_HAS_MINIMUM_LENGTH")
  @IsEmail("EMAIL_IS_VALID")
  @IsRequired("EMAIL_IS_REQUIRED")
  @IsString("EMAIL_IS_STRING")
  @Trim()
  public readonly email: string;

  @ApiProperty("password", FakeData.strongPassword())
  @HasMaxLength(64, "PASSWORD_HAS_MAXIMUM_LENGTH")
  @HasMinLength(8, "PASSWORD_HAS_MINIMUM_LENGTH")
  @IsRequired("PASSWORD_IS_REQUIRED")
  @IsString("PASSWORD_IS_STRING")
  @IsStrongPassword("PASSWORD_IS_STRONG")
  @Trim()
  public readonly password: string;
}
