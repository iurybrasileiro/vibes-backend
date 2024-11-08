import { IsNotEmpty, IsEmail } from 'class-validator'

export class RecoveryPasswordDto {
  @IsNotEmpty({
    message: 'The email is required',
  })
  @IsEmail(undefined, {
    message: 'The email is invalid',
  })
  email: string
}
