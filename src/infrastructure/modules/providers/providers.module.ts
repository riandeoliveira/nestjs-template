import { Module } from "@nestjs/common";
import { CurrentUserIdProvider } from "./current-user-id.provider";

@Module({
  providers: [CurrentUserIdProvider],
  exports: [CurrentUserIdProvider],
})
export class ProvidersModule {}
