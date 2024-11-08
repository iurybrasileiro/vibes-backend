import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

import { type SendMailDto } from './dtos/send-mail.dto'

@Injectable()
export class NotificationsService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(data: SendMailDto) {
    await this.mailService.sendMail({
      to: data.to,
      subject: data.subject,
      html: data.html,
    })
  }
}
