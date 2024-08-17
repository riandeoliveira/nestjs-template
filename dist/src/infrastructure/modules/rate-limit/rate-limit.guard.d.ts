import { ThrottlerGuard } from "@nestjs/throttler";
export declare class RateLimitGuard extends ThrottlerGuard {
    protected throwThrottlingException(): Promise<void>;
}
