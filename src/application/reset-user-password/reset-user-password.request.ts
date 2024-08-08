import { FakeData } from "@/infrastructure/abstractions/fake-data.abstraction";
import { ApiProperty } from "@/infrastructure/decorators/api-property.decorator";
import { HasMaxLength } from "@/infrastructure/decorators/has-max-length.decorator";
import { HasMinLength } from "@/infrastructure/decorators/has-min-length.decorator";
import { IsRequired } from "@/infrastructure/decorators/is-required.decorator";
import { IsString } from "@/infrastructure/decorators/is-string.decorator";
import { IsStrongPassword } from "@/infrastructure/decorators/is-strong-password.decorator";

// TODO: Adicionar validações de senhas equivalentes

export abstract class ResetUserPasswordRequest {
  @ApiProperty("password", FakeData.strongPassword())
  @HasMaxLength(64, "PASSWORD_HAS_MAXIMUM_LENGTH")
  @HasMinLength(8, "PASSWORD_HAS_MAXIMUM_LENGTH")
  @IsRequired("PASSWORD_IS_REQUIRED")
  @IsString("PASSWORD_IS_STRING")
  @IsStrongPassword("PASSWORD_IS_STRONG")
  public readonly password: string;

  @ApiProperty("password_confirmation", FakeData.strongPassword())
  @HasMaxLength(64, "PASSWORD_CONFIRMATION_HAS_MAXIMUM_LENGTH")
  @HasMinLength(8, "PASSWORD_CONFIRMATION_HAS_MAXIMUM_LENGTH")
  @IsRequired("PASSWORD_CONFIRMATION_IS_REQUIRED")
  @IsString("PASSWORD_CONFIRMATION_IS_STRING")
  @IsStrongPassword("PASSWORD_IS_STRONG")
  public readonly passwordConfirmation: string;
}
