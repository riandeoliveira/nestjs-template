import { ApplicationModule } from "@/application/application.module";
import { RateLimitGuard } from "@/infrastructure/guards/rate-limit.guard";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    ApplicationModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
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
