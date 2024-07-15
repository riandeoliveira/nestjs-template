import { UserDto } from "@/domain/dtos/user.dto";
import { ResponseMessages } from "@/domain/enums/response-messages.enum";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED_OPERATION);

    try {
      const payload: UserDto = await this.jwtService.verifyAsync(token, {
        secret: "secret",
      });

      const { id, email } = payload;

      request.user = { id, email };
    } catch {
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZED_OPERATION);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
