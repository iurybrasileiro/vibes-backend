import {
  Controller,
  HttpStatus,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'

import { Response } from 'express'

import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-auth.decorator'
import { AccessTokenAuthGuard } from './guards/access-token-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { RefreshTokenAuthGuard } from './guards/refresh-token-auth.guard'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @CurrentUser('id')
    id: string,
    @Res()
    response: Response,
  ) {
    const tokens = await this.authService.signIn(id)
    response.status(HttpStatus.OK).send(tokens)
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Patch('refresh-token')
  async refreshToken(
    @CurrentUser()
    user: { id: string; refresh_token: string },
    @Res()
    response: Response,
  ) {
    const tokens = await this.authService.refreshToken(
      user.id,
      user.refresh_token,
    )
    response.status(HttpStatus.OK).send(tokens)
  }

  @UseGuards(AccessTokenAuthGuard)
  @Patch('sign-out')
  async signOut(
    @CurrentUser('id')
    id: string,
    @Res()
    response: Response,
  ) {
    await this.authService.signOut(id)
    response.status(HttpStatus.OK).send()
  }
}
