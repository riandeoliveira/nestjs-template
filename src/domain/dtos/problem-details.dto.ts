import { faker } from "@faker-js/faker";
import { HttpStatus } from "@nestjs/common";
import { PROBLEM_DETAILS_URI } from "../constants";
import { HttpMessages } from "../enums/http-messages.enum";
import { ApiProperty } from "@/infrastructure/decorators/api-property.decorator";

export abstract class ProblemDetailsDto {
  @ApiProperty("type", `${PROBLEM_DETAILS_URI}/${HttpStatus.BAD_REQUEST}`)
  public readonly type: string;

  @ApiProperty("title", faker.lorem.sentence())
  public readonly title: string;

  @ApiProperty("status", HttpStatus.BAD_REQUEST)
  public readonly status: number;

  @ApiProperty("detail", HttpMessages.BAD_REQUEST)
  public readonly detail?: string;
}
