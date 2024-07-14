import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeleteUserModule } from "./application/delete-user/delete-user.module";
import { SignInUserModule } from "./application/sign-in-user/sign-in-user.module";
import { SignUpUserModule } from "./application/sign-up-user/sign-up-user.module";
import { UpdateUserModule } from "./application/update-user/update-user.module";

@Module({
  imports: [
    DeleteUserModule,
    SignInUserModule,
    SignUpUserModule,
    UpdateUserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: process.env.DATABASE_SOURCE,
      synchronize: process.env.NODE_ENV === "development",
      entities: [`${__dirname}/domain/entities/*.entity{.ts,.js}`],
    }),
  ],
})
export class AppModule {}
