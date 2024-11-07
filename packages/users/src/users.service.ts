import { BadRequestException, Injectable } from '@nestjs/common'

import { type CreateUserDto } from './dtos/create-user.dto'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: data.email },
    })

    if (user) {
      throw new BadRequestException('User already exists')
    }

    await this.usersRepository.create(data)
  }
}
