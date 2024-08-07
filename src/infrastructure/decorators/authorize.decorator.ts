import { UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth.guard";

export const Authorize = () => {
  return applyDecorators(ApiBearerAuth("jwt"), UseGuards(AuthGuard));
};
