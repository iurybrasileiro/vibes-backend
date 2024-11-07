import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'

import { Response } from 'express'

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
}
