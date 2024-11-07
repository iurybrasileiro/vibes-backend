import { InjectRepository } from '@nestjs/typeorm'

import {
  type DeepPartial,
  type FindManyOptions,
  type FindOneOptions,
  type FindOptionsRelations,
  type FindOptionsWhere,
  type Repository,
} from 'typeorm'

import { type PaginationOptions } from './pagination-options.interface'
import { UserEntity } from './user.entity'

export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findById(id: string, relations?: FindOptionsRelations<UserEntity>) {
    return await this.repository.findOne({
      where: { id: id as any },
      relations,
    })
  }

  async find(params: FindManyOptions<UserEntity>) {
    return await this.repository.find(params)
  }

  async findOne(params: FindOneOptions<UserEntity>) {
    return await this.repository.findOne(params)
  }

  async findPaginated(
    where: FindManyOptions<UserEntity>['where'],
    pagination: PaginationOptions,
  ) {
    const take = pagination.take ?? 10
    const page = pagination.page ?? 1
    const skip = (page - 1) * take

    const [data, total] = await this.repository.findAndCount({
      where,
      take,
      skip,
    })

    const last_page = Math.ceil(total / take)

    const metadata = {
      total,
      current_page: pagination.page,
      last_page,
    }

    return {
      data,
      metadata,
    }
  }

  async create(data: DeepPartial<UserEntity>) {
    const entity = this.repository.create(data)
    await entity.save()

    return entity
  }

  async save(entity: UserEntity) {
    await entity.save()
  }

  async softDelete(entity: UserEntity) {
    await this.repository.softRemove(entity)
  }

  async delete(where: FindOptionsWhere<UserEntity>) {
    await this.repository.delete(where)
  }
}
