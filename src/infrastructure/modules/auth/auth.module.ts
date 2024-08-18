import { MiddlewareConsumer, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AddResponseMiddleware } from "../../middlewares/add-response.middleware";
import { EnvironmentModule } from "../environment/environment.module";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    EnvironmentModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AddResponseMiddleware).forRoutes("*");
  }
}
