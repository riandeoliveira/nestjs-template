import { HttpMessages, HttpMessagesKey } from "@/domain/enums/http-messages.enum";
import { HttpStatus, Type } from "@nestjs/common";
import { ApiResponse as SwaggerApiResponse } from "@nestjs/swagger";

type ApiResponseType = Type<unknown> | Function | [Function] | string;

type ApiResponseReturnType = MethodDecorator & ClassDecorator;

export const ApiResponse = (
  key: HttpMessagesKey,
  type?: ApiResponseType,
): ApiResponseReturnType => {
  return SwaggerApiResponse({
    status: HttpStatus[key],
    description: HttpMessages[key],
    type,
  });
};
