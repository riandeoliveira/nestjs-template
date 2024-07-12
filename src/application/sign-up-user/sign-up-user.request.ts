import { MESSAGES } from "@/domain/messages/messages";
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

export class SignUpUserRequest {
  @ApiProperty({
    example: faker.internet.email(),
  })
  @IsEmail({}, { message: MESSAGES.EMAIL.IS_VALID })
  @IsNotEmpty({ message: MESSAGES.EMAIL.IS_REQUIRED })
  @IsString({ message: MESSAGES.EMAIL.IS_STRING })
  @MaxLength(64, { message: MESSAGES.EMAIL.HAS_MAXIMUM_LENGTH })
  @MinLength(8, { message: MESSAGES.EMAIL.HAS_MINIMUM_LENGTH })
  public readonly email: string;

  @ApiProperty({
    example: faker.internet.password({ prefix: "$0" }),
  })
  @IsNotEmpty({ message: MESSAGES.PASSWORD.IS_REQUIRED })
  @IsString({ message: MESSAGES.PASSWORD.IS_STRING })
  @IsStrongPassword({}, { message: MESSAGES.PASSWORD.IS_STRONG })
  @MaxLength(64, { message: MESSAGES.PASSWORD.HAS_MAXIMUM_LENGTH })
  @MinLength(8, { message: MESSAGES.PASSWORD.HAS_MINIMUM_LENGTH })
  public readonly password: string;
}
