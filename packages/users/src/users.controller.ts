import { Body, Controller, HttpStatus, Patch, Post, Res } from '@nestjs/common'

import { Response } from 'express'

import { ConfirmAccountDto } from './dtos/confirm-account.dto'
import { CreateUserDto } from './dtos/create-user.dto'
import { UsersService } from './users.service'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body()
    data: CreateUserDto,
    @Res()
    response: Response,
  ) {
    await this.usersService.create(data)
    response.status(HttpStatus.CREATED).json({
      message: 'Your account has been successfully created',
    })
  }

  @Patch('confirm-account')
  async confirmAccount(
    @Body()
    data: ConfirmAccountDto,
    @Res()
    response: Response,
  ) {
    await this.usersService.confirmAccount(data)
    response.status(HttpStatus.OK).json({
      message: 'Account confirmed successfully',
    })
  }
}
