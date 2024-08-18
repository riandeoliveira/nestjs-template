import { ResponseMessages } from "../../../domain/enums/response-messages.enum";
import { Injectable } from "@nestjs/common";
import { ThrottlerException, ThrottlerGuard } from "@nestjs/throttler";

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  protected throwThrottlingException(): Promise<void> {
    throw new ThrottlerException(ResponseMessages.TOO_MANY_REQUESTS);
  }
}
