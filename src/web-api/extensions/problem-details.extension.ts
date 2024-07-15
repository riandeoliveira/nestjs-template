import { PROBLEM_DETAILS_URI } from "@/domain/constants";
import { HttpStatus, INestApplication } from "@nestjs/common";
import _ from "lodash";
import { HttpExceptionFilter } from "nest-problem-details-filter";

export abstract class ProblemDetailsExtension {
  public static configureWith(application: INestApplication): void {
    const httpStatus = _.chain(HttpStatus)
      .values()
      .filter(_.isNumber)
      .keyBy(_.identity)
      .mapValues(_.toString)
      .value();

    application.useGlobalFilters(new HttpExceptionFilter(PROBLEM_DETAILS_URI, httpStatus));
  }
}
