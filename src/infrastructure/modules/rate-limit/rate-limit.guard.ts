import { Injectable } from "@nestjs/common";
import { ThrottlerException, ThrottlerGuard } from "@nestjs/throttler";
import { ResponseMessages } from "../../../domain/enums/response-messages.enum";

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  protected throwThrottlingException(): Promise<void> {
    throw new ThrottlerException(ResponseMessages.TOO_MANY_REQUESTS);
  }
}
