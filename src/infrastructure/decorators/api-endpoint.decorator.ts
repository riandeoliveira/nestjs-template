import { Controller, applyDecorators } from "@nestjs/common";
import { ApiProduces } from "@nestjs/swagger";

export const ApiEndpoint = (prefix: string | string[]) => {
  return applyDecorators(
    ApiProduces("application/json", "application/problem+json"),
    Controller(prefix),
  );
};
