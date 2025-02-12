import { type INestApplication } from '@nestjs/common'
import { Test, type TestingModule } from '@nestjs/testing'

import * as request from 'supertest'
import { type App } from 'supertest/types'

import { UsersModule } from './../src/users.module'

describe('UsersController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer() as App)
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!')
  // })
})
