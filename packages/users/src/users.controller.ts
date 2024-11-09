import {
  Get,
  Res,
  Body,
  Post,
  Patch,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { Response } from 'express'

import { CurrentUser } from './decorators/current-auth.decorator'
import { ConfirmAccountDto } from './dtos/confirm-account.dto'
import { CreateUserDto } from './dtos/create-user.dto'
import { EditUserDto } from './dtos/edit-user.dto'
import { RecoveryPasswordDto } from './dtos/recovery-password.dto'
import { ResetPasswordDto } from './dtos/reset-password.dto'
import { AccessTokenAuthGuard } from './guards/access-token-auth.guard'
import { UserEntity } from './user.entity'
import { UsersService } from './users.service'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AccessTokenAuthGuard)
  async profile(
    @CurrentUser()
    user: UserEntity,
    @Res()
    response: Response,
  ) {
    response.status(HttpStatus.OK).json(user)
  }

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

  @Patch()
  @UseGuards(AccessTokenAuthGuard)
  async edit(
    @CurrentUser('id')
    id: string,
    @Body()
    data: EditUserDto,
    @Res()
    response: Response,
  ) {
    const user = await this.usersService.edit(id, data)
    response.status(HttpStatus.OK).json(user)
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

  @Patch('recovery-password')
  async recoveryPassword(
    @Body()
    data: RecoveryPasswordDto,
    @Res()
    response: Response,
  ) {
    await this.usersService.recoveryPassword(data)
    response.status(HttpStatus.OK).json({
      message:
        "You'll receive an email if we found an account registered with email",
    })
  }

  @Patch('reset-password')
  async resetPassword(
    @Body()
    data: ResetPasswordDto,
    @Res()
    response: Response,
  ) {
    await this.usersService.resetPassword(data)
    response.status(HttpStatus.OK).json({
      message: 'Password recovered successfully',
    })
  }

  @MessagePattern('get-user-by-id')
  async getUserById(@Payload() { id }: { id: string }) {
    return await this.usersService.getUserById(id)
  }

  @MessagePattern('validate-user')
  async validateUser(
    @Payload() { email, password }: { email: string; password: string },
  ) {
    return await this.usersService.validate(email, password)
  }

  @MessagePattern('update-user-refresh-token')
  async saveUserRefreshToken(
    @Payload() { id, refresh_token }: { id: string; refresh_token: string },
  ) {
    return await this.usersService.saveUserRefreshToken(id, refresh_token)
  }
}
