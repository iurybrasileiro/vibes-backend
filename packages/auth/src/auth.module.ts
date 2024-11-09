import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { USERS_SERVICE } from './consts/services'
import { AccessTokenAuthStrategy } from './strategies/access-token-auth.strategy'
import { LocalAuthStrategy } from './strategies/local-auth.strategy'
import { RefreshTokenAuthStrategy } from './strategies/refresh-token-auth.strategy'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: USERS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: USERS_SERVICE,
          },
        }),
        inject: [ConfigService],
      },
    ]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthStrategy,
    AccessTokenAuthStrategy,
    RefreshTokenAuthStrategy,
  ],
})
export class AuthModule {}
