import {
  type CanActivate,
  type ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import { catchError, map, of, tap, type Observable } from 'rxjs'
import { type UserEntity } from 'src/user.entity'

import { AUTH_SERVICE } from '../consts/services'

@Injectable()
export class AccessTokenAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authClient: ClientProxy,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().headers?.authorization
    if (!jwt) {
      return false
    }

    return this.authClient
      .send<UserEntity>('authenticate', {
        authorization: jwt,
      })
      .pipe(
        tap(response => {
          context.switchToHttp().getRequest().user = response
        }),
        map(() => true),
        catchError(() => of(false)),
      )
  }
}
