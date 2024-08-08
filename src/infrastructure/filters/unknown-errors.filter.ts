import { PROBLEM_DETAILS_URI } from "@/domain/constants";
import { HttpResponses } from "@/domain/constants/http-responses";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from "express";

@Catch()
export class UnknownErrorsFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response = context.getResponse<Response>();

    const { status, message } = HttpResponses.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      type: `${PROBLEM_DETAILS_URI}/${status}`,
      title: exception instanceof Error ? exception.message : ResponseMessages.UNKNOWN_ERROR,
      status,
      detail: message,
    });
  }
}
