import {
  BadRequestException,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'

import { USERS_SERVICE } from './consts/services'
import { UsersModule } from './users.module'
import { parseValidationPipe } from './utils'

async function bootstrap() {
  const app = await NestFactory.create(UsersModule)
  const configService = app.get(ConfigService)

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: errors => {
        const message = parseValidationPipe(errors)

        if (message) {
          return new BadRequestException(message)
        }

        return new InternalServerErrorException('We had an unexpected error')
      },
    }),
  )

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: USERS_SERVICE,
    },
  })

  await app.listen(configService.getOrThrow('PORT'))
  await app.startAllMicroservices()
}

void bootstrap()
