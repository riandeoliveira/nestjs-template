import { HttpMessages } from "@/domain/enums/http-messages";
import { HttpStatus, Type } from "@nestjs/common";
import { ApiResponse as SwaggerApiResponse } from "@nestjs/swagger";

type ApiResponseKey = keyof typeof HttpStatus;

type ApiResponseType = Type<unknown> | Function | [Function] | string;

type ApiResponseReturnType = MethodDecorator & ClassDecorator;

export const ApiResponse = (key: ApiResponseKey, type?: ApiResponseType): ApiResponseReturnType => {
  return SwaggerApiResponse({
    status: HttpStatus[key],
    description: HttpMessages[key],
    type,
  });
};
