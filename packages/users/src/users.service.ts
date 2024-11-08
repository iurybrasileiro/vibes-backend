import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientProxy } from '@nestjs/microservices'

import { getTime } from 'date-fns'
import { resolve } from 'path'
import { lastValueFrom } from 'rxjs'

import { NOTIFICATIONS_SERVICE } from './consts/services'
import { type ConfirmAccountDto } from './dtos/confirm-account.dto'
import { type CreateUserDto } from './dtos/create-user.dto'
import { UsersRepository } from './users.repository'
import { getEmailTemplate } from './utils'

@Injectable()
export class UsersService {
  constructor(
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationClient: ClientProxy,
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {}

  async create(data: CreateUserDto) {
    let user = await this.usersRepository.findOne({
      where: { email: data.email },
    })

    if (user) {
      throw new BadRequestException('User already exists')
    }

    user = await this.usersRepository.create(data)

    const confirm_account_link = `${this.configService.getOrThrow('FRONTEND_URI')}/confirm-account/${user.verification_code}`

    const template = getEmailTemplate(
      resolve(__dirname, 'templates', 'confirm_account.hbs'),
      {
        name: user.name,
        link: confirm_account_link,
      },
    )

    await lastValueFrom(
      this.notificationClient.emit('send-mail', {
        to: user.email,
        subject: 'Confirm your account',
        html: template.toString(),
      }),
    )
  }

  async confirmAccount(data: ConfirmAccountDto) {
    const user = await this.usersRepository.findOne({
      where: { email: data.email },
    })

    if (!user) {
      throw new BadRequestException('Account not found')
    }

    if (user.verificated) {
      throw new BadRequestException('Account already confirmed')
    }

    if (user.verification_code !== data.verification_code) {
      throw new BadRequestException('The code provided is invalid')
    }

    if (
      getTime(new Date()) > getTime(new Date(user.verification_code_expires_in))
    ) {
      throw new BadRequestException('The code provided is expired')
    }

    user.verificated = true
    user.verification_code = null
    user.verification_code_expires_in = null

    await this.usersRepository.save(user)
  }
}
