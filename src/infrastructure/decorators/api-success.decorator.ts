import { HttpResponses, HttpSuccessResponsesKey } from "@/domain/constants/http-responses";
import { HttpCode, Type, applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

type ApiSuccessResponseType = Type<unknown> | Function | [Function] | string;

export const ApiSuccessResponse = (key: HttpSuccessResponsesKey, type?: ApiSuccessResponseType) => {
  const { status, message } = HttpResponses[key];

  const decorator = ApiResponse({
    status,
    description: message,
    type,
  });

  return applyDecorators(decorator, HttpCode(status));
};
