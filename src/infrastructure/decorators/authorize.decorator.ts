import { UseGuards, applyDecorators } from "@nestjs/common";
import { ApiCookieAuth } from "@nestjs/swagger";
import { AuthGuard } from "../modules/auth/auth.guard";

export const Authorize = () => {
  return applyDecorators(ApiCookieAuth("access_token"), UseGuards(AuthGuard));
};
