import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ResponseMessages } from "../../../domain/enums/response-messages.enum";
import { IRequest } from "../../../domain/interfaces/request.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    const accessToken: string | undefined = request.cookies["access_token"];

    if (!accessToken) throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED_OPERATION);

    try {
      const payload: { userId: string } = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      request.currentUserId = payload.userId;
    } catch {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED_OPERATION);
    }

    return true;
  }
}
