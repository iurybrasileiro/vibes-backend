import { IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator'

export class ResetPasswordDto {
  @IsNotEmpty({
    message: 'The email is required',
  })
  @IsEmail(undefined, {
    message: 'The email is invalid',
  })
  email: string

  @IsNotEmpty({
    message: 'The reset password code is required',
  })
  @Matches(/[0-9]{6}/g, {
    message: 'The reset password code is composed by six numbers',
  })
  reset_password_code: string

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
}
