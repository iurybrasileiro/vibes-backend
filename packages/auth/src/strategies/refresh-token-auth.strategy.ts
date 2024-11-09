import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { type Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { type TokenPayload } from '../interfaces/token-payload.interface'

@Injectable()
export class RefreshTokenAuthStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    })
  }

  async validate(request: Request, { id }: TokenPayload) {
    const refresh_token = request
      .get('Authorization')
      .replace('Bearer', '')
      .trim()

    return { id, refresh_token }
  }
}
