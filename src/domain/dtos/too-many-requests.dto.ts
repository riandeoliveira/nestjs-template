import { FakeData } from "@/infrastructure/abstractions/fake-data.abstraction";
import { ApiProperty } from "@/infrastructure/decorators/api-property.decorator";
import { PROBLEM_DETAILS_URI } from "../constants";
import { HttpResponses } from "../constants/http-responses";

const { status, message } = HttpResponses.TOO_MANY_REQUESTS;

export abstract class TooManyRequestsDto {
  @ApiProperty("type", `${PROBLEM_DETAILS_URI}/${status}`)
  public readonly type: string;

  @ApiProperty("title", FakeData.sentence())
  public readonly title: string;

  @ApiProperty("status", status)
  public readonly status: number;

  @ApiProperty("detail", message)
  public readonly detail?: string;
}
