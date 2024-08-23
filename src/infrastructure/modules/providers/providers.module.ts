import { Module } from "@nestjs/common";
import { CurrentUserIdProvider } from "./current-user-id.provider";
import { HttpResponseProvider } from "./http-response.provider";

@Module({
  providers: [CurrentUserIdProvider, HttpResponseProvider],
  exports: [CurrentUserIdProvider, HttpResponseProvider],
})
export class ProvidersModule {}
