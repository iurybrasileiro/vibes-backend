import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator'

import { IsBirthdateValid } from '../validations/birthdate.validation'

export class CreateUserDto {
  @IsNotEmpty({
    message: 'The name is required',
  })
  name: string

  @IsNotEmpty({
    message: 'The email is required',
  })
  @IsEmail(undefined, {
    message: 'The email is invalid',
  })
  email: string

  @IsNotEmpty({
    message: 'The password is required',
  })
  @Matches(/([(!@#$%^&*)(+=._-]){1,}/g, {
    message: 'the password should contains at least one spetial character',
  })
  @Matches(/([a-z]){1,}/g, {
    message: 'The password should contains at least one lowercase letter',
  })
  @Matches(/([A-Z]){1,}/g, {
    message: 'The password should contains at least one uppercase letter',
  })
  @MinLength(8, {
    message: 'The password should contains at least 8 characters',
  })
  password: string

  @IsNotEmpty({
    message: 'The birthdate is required',
  })
  @IsBirthdateValid(18, {
    message: 'You need be greater than 18 years',
  })
  birthdate: string
}
