import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { SendMailDto } from './dtos/send-mail.dto'
import { NotificationsService } from './notifications.service'

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('send-mail')
  async sendMail(@Payload() data: SendMailDto) {
    await this.notificationsService.sendMail(data)
  }
}
