import { ProblemDetailsDto } from "@/domain/dtos/problem-details.dto";
import { HttpMessages, HttpMessagesKey } from "@/domain/enums/http-messages.enum";
import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ApiErrorResponses = (keys: HttpMessagesKey[]): MethodDecorator & ClassDecorator => {
  const decorators = keys.map((key) =>
    ApiResponse({
      status: HttpStatus[key],
      description: HttpMessages[key],
      type: ProblemDetailsDto,
    }),
  );

  return applyDecorators(...decorators);
};
