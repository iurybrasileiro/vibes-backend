import {
  BadRequestException,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

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

  await app.listen(configService.getOrThrow('PORT'))
}

void bootstrap()
