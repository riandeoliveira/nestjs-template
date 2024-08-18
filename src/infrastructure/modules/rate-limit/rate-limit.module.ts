import { MAXIMUM_REQUESTS_ALLOWED_PER_TTL, TIME_TO_LIVE_IN_SECONDS } from "../../../domain/constants";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";
import { RateLimitGuard } from "./rate-limit.guard";

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: TIME_TO_LIVE_IN_SECONDS,
        limit: MAXIMUM_REQUESTS_ALLOWED_PER_TTL,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class RateLimitModule {}
