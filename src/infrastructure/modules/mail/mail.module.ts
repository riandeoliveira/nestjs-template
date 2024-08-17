import { EnvironmentVariables } from "@/domain/constants/environment-variables";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import path from "path";
import { MailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: EnvironmentVariables.MAIL_HOST,
        sender: EnvironmentVariables.MAIL_SENDER,
        auth: {
          user: EnvironmentVariables.MAIL_USERNAME,
          pass: EnvironmentVariables.MAIL_PASSWORD,
        },
      },
      template: {
        dir: path.join(__dirname, "../../../web-api/templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
