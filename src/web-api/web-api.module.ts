import { ApplicationModule } from "@/application/application.module";
import { MAXIMUM_REQUESTS_ALLOWED_PER_TTL, TIME_TO_LIVE_IN_SECONDS } from "@/domain/constants";
import { RateLimitGuard } from "@/infrastructure/guards/rate-limit.guard";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    ApplicationModule,
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
export class WebApiModule {}
