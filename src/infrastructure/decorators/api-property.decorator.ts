import { applyDecorators } from "@nestjs/common";
import { ApiProperty as SwaggerApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export const ApiProperty = (name: string, example?: any) => {
  return applyDecorators(
    SwaggerApiProperty({
      name,
      example,
    }),
    Expose({ name }),
  );
};
