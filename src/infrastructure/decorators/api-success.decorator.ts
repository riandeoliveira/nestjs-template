import { HttpMessages, HttpMessagesKey } from "@/domain/enums/http-messages.enum";
import { HttpCode, HttpStatus, Type, applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

type ApiSuccessResponseType = Type<unknown> | Function | [Function] | string;

export const ApiSuccessResponse = (key: HttpMessagesKey, type?: ApiSuccessResponseType) => {
  const status: number = HttpStatus[key];

  const decorator = ApiResponse({
    status: HttpStatus[key],
    description: HttpMessages[key],
    type,
  });

  return applyDecorators(decorator, HttpCode(status));
};
