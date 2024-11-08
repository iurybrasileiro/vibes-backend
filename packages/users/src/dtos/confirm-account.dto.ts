import { IsEmail, IsNotEmpty, Matches } from 'class-validator'

export class ConfirmAccountDto {
  @IsNotEmpty({
    message: 'The email is required',
  })
  @IsEmail(undefined, {
    message: 'The email is invalid',
  })
  email: string

  @IsNotEmpty({
    message: 'The verification code is required',
  })
  @Matches(/[0-9]{6}/g, {
    message: 'The verification code is composed by six numbers',
  })
  verification_code: string
}
