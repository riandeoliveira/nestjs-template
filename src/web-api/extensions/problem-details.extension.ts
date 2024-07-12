import { HttpStatus, INestApplication } from "@nestjs/common";
import { HttpExceptionFilter } from "nest-problem-details-filter";

export abstract class ProblemDetailsExtension {
  public static configureWith(application: INestApplication): void {
    const httpStatus = Object.values(HttpStatus)
      .filter((value) => typeof value === "number")
      .reduce(
        (accumulator, value: any) => {
          accumulator[value] = value.toString();

          return accumulator;
        },
        {} as { [key: number]: string },
      );

    application.useGlobalFilters(new HttpExceptionFilter("https://httpstatuses.com", httpStatus));
  }
}
