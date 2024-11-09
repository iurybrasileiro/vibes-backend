import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from 'src/auth.service'

import { type TokenPayload } from '../interfaces/token-payload.interface'

@Injectable()
export class AccessTokenAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          const authorization =
            (request.headers?.authorization || request?.authorization) ?? ''
          const [, token] = authorization.split(' ')

          return token
        },
      ]),
      secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
    })
  }

  async validate({ id }: TokenPayload) {
    const user = await this.authService.getUserById(id)

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return user
  }
}
