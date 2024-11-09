import { OmitType } from '@nestjs/mapped-types'

import { IsEnum, IsOptional } from 'class-validator'
import { VISIBILITY } from 'src/enums'

import { CreateUserDto } from './create-user.dto'

export class EditUserDto extends OmitType(CreateUserDto, [
  'email',
  'password',
]) {
  @IsEnum(VISIBILITY)
  @IsOptional()
  visibility: VISIBILITY
}
