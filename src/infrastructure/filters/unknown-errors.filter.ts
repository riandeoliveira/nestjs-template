import { PROBLEM_DETAILS_URI } from "@/domain/constants";
import { HttpMessages } from "@/domain/enums/http-messages.enum";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class UnknownErrorsFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const status: number = HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      type: `${PROBLEM_DETAILS_URI}/${status}`,
      title: exception instanceof Error ? exception.message : ResponseMessages.UNKNOWN_ERROR,
      status,
      detail: HttpMessages.INTERNAL_SERVER_ERROR,
    });
  }
}
