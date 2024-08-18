import { HttpErrorResponsesKey, HttpResponses } from "../../domain/constants/http-responses";
import { BadRequestDto } from "../../domain/dtos/bad-request.dto";
import { ConflictDto } from "../../domain/dtos/conflict.dto";
import { InternalServerErrorDto } from "../../domain/dtos/internal-server-error.dto";
import { NotFoundDto } from "../../domain/dtos/not-found.dto";
import { ProblemDetailsDto } from "../../domain/dtos/problem-details.dto";
import { TooManyRequestsDto } from "../../domain/dtos/too-many-requests.dto";
import { UnauthorizedDto } from "../../domain/dtos/unauthorized.dto";
import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ApiErrorResponses = (
  keys: HttpErrorResponsesKey[],
): MethodDecorator & ClassDecorator => {
  const decorators = keys.map((key) => {
    const type: Partial<Record<HttpErrorResponsesKey, typeof ProblemDetailsDto>> = {
      BAD_REQUEST: BadRequestDto,
      CONFLICT: ConflictDto,
      INTERNAL_SERVER_ERROR: InternalServerErrorDto,
      NOT_FOUND: NotFoundDto,
      TOO_MANY_REQUESTS: TooManyRequestsDto,
      UNAUTHORIZED: UnauthorizedDto,
    };

    const { status, message } = HttpResponses[key];

    return ApiResponse({
      status,
      description: message,
      type: type[key],
    });
  });

  return applyDecorators(...decorators);
};
