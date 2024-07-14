import { faker } from "@faker-js/faker";
import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PROBLEM_DETAILS_URI } from "../contants";
import { HttpMessages } from "../enums/http-messages";

export class ProblemDetailsDto {
  @ApiProperty({
    name: "type",
    example: `${PROBLEM_DETAILS_URI}/${HttpStatus.BAD_REQUEST}`,
  })
  public readonly type: string;

  @ApiProperty({
    name: "title",
    example: faker.lorem.sentence(),
  })
  public readonly title: string;

  @ApiProperty({
    name: "status",
    example: HttpStatus.BAD_REQUEST,
  })
  public readonly status: number;

  @ApiProperty({
    name: "detail",
    example: HttpMessages.BAD_REQUEST,
  })
  public readonly detail?: string;
}
