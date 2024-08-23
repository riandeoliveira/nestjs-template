import { BadRequestException, ExecutionContext, Type, createParamDecorator } from "@nestjs/common";
import { ValidationError, validateOrReject } from "class-validator";
import { Request } from "express";

type CookieData = {
  name: string;
  type: Type;
};

export const Cookies = createParamDecorator(async (data: CookieData, context: ExecutionContext) => {
  const request: Request = context.switchToHttp().getRequest();

  const { name, type: RequestClass } = data;

  const cookieValue: string = request.cookies[name];

  const instance = new RequestClass(cookieValue);

  try {
    await validateOrReject(instance);
  } catch (errors: unknown) {
    const [error] = errors as ValidationError[];

    if (error instanceof ValidationError) {
      const validationErrors: string[] = Object.values(error.constraints);

      throw new BadRequestException(validationErrors);
    }

    throw new BadRequestException(errors);
  }

  return instance;
});
