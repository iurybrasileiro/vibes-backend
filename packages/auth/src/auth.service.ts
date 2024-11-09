import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ClientProxy } from '@nestjs/microservices'

import { lastValueFrom } from 'rxjs'

import { USERS_SERVICE } from './consts/services'

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersClient: ClientProxy,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(id: string) {
    const { access_token, refresh_token } = await this.generateToken(id)

    await lastValueFrom(
      this.usersClient.send('update-user-refresh-token', {
        id,
        refresh_token,
      }),
    )

    return {
      access_token,
      refresh_token,
    }
  }

  async refreshToken(id: string, old_refresh_token: string) {
    const user = await this.getUserById(id)

    if (!user) {
      throw new BadRequestException('Unable to renew your session')
    }

    if (user.refresh_token !== old_refresh_token) {
      throw new ForbiddenException('Unable to renew your session')
    }

    const { access_token, refresh_token } = await this.generateToken(id)

    await lastValueFrom(
      this.usersClient.send('update-user-refresh-token', { id, refresh_token }),
    )

    return {
      access_token,
      refresh_token,
    }
  }

  async signOut(id: string) {
    await lastValueFrom(
      this.usersClient.send('update-user-refresh-token', {
        id,
        refresh_token: null,
      }),
    )
  }

  async getUserById(id: string) {
    const user = await lastValueFrom(
      this.usersClient.send('get-user-by-id', {
        id,
      }),
    )

    return user
  }

  async validate(email: string, password: string) {
    const user = await lastValueFrom(
      this.usersClient.send('validate-user', {
        email,
        password,
      }),
    )

    return user
  }

  async generateToken(id: string) {
    const payload = {
      id,
    }

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: '1d',
    })

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: '15d',
    })

    return {
      access_token,
      refresh_token,
    }
  }
}
