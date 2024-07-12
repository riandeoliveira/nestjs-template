import { SignInUserModule } from "@/application/sign-in-user/sign-in-user.module";
import { SignUpUserModule } from "@/application/sign-up-user/sign-up-user.module";
import { User } from "@/domain/entities/user.entity";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    SignInUserModule,
    SignUpUserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: process.env.DATABASE_URI,
      entities: [User],
      synchronize: process.env.NODE_ENV === "development",
    }),
  ],
})
export class AppModule {}
