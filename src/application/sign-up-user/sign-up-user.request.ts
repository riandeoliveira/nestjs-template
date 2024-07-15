import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { Trim } from "@/infrastructure/decorators/trim.decorator";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";

export abstract class SignUpUserRequest {
  @ApiProperty({
    example: faker.internet.email(),
  })
  @IsEmail({}, { message: ResponseMessages.EMAIL_IS_VALID })
  @IsNotEmpty({ message: ResponseMessages.EMAIL_IS_REQUIRED })
  @IsString({ message: ResponseMessages.EMAIL_IS_STRING })
  @MaxLength(64, { message: ResponseMessages.EMAIL_HAS_MAXIMUM_LENGTH })
  @MinLength(8, { message: ResponseMessages.EMAIL_HAS_MINIMUM_LENGTH })
  @Trim()
  public readonly email: string;

  @ApiProperty({
    example: faker.internet.password({ prefix: "$0" }),
  })
  @IsNotEmpty({ message: ResponseMessages.PASSWORD_IS_REQUIRED })
  @IsString({ message: ResponseMessages.PASSWORD_IS_STRING })
  @IsStrongPassword({}, { message: ResponseMessages.PASSWORD_IS_STRONG })
  @MaxLength(64, { message: ResponseMessages.PASSWORD_HAS_MAXIMUM_LENGTH })
  @MinLength(8, { message: ResponseMessages.PASSWORD_HAS_MINIMUM_LENGTH })
  @Trim()
  public readonly password: string;
}
