import { createParamDecorator, type ExecutionContext } from '@nestjs/common'

import { plainToClass } from 'class-transformer'
import { UserEntity } from 'src/user.entity'

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    const user = plainToClass(UserEntity, request.user).toJSON()

    return data ? user?.[data] : user
  },
)
