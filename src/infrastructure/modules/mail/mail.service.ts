import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  public constructor(private readonly mailerService: MailerService) {}

  public async sendMail(sendMailOptions: ISendMailOptions): Promise<void> {
    await this.mailerService.sendMail({
      ...sendMailOptions,
    });
  }
}
