import { MESSAGES } from "@/domain/messages/messages";
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
  ValidateIf,
} from "class-validator";

export abstract class UpdateUserRequest {
  @ApiProperty({
    example: faker.internet.email(),
  })
  @ValidateIf((request: UpdateUserRequest) => request.email !== undefined)
  @IsEmail({}, { message: MESSAGES.EMAIL.IS_VALID })
  @IsNotEmpty({ message: MESSAGES.EMAIL.IS_REQUIRED })
  @IsString({ message: MESSAGES.EMAIL.IS_STRING })
  @MaxLength(64, { message: MESSAGES.EMAIL.HAS_MAXIMUM_LENGTH })
  @MinLength(8, { message: MESSAGES.EMAIL.HAS_MINIMUM_LENGTH })
  @Trim()
  public readonly email?: string;

  @ApiProperty({
    example: faker.internet.password({ prefix: "$0" }),
  })
  @ValidateIf((request: UpdateUserRequest) => request.password !== undefined)
  @IsNotEmpty({ message: MESSAGES.PASSWORD.IS_REQUIRED })
  @IsString({ message: MESSAGES.PASSWORD.IS_STRING })
  @IsStrongPassword({}, { message: MESSAGES.PASSWORD.IS_STRONG })
  @MaxLength(64, { message: MESSAGES.PASSWORD.HAS_MAXIMUM_LENGTH })
  @MinLength(8, { message: MESSAGES.PASSWORD.HAS_MINIMUM_LENGTH })
  @Trim()
  public readonly password?: string;
}
