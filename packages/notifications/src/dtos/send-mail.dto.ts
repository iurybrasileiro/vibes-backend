import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SendMailDto {
  @IsEmail(null, { message: 'The email is invalid' })
  @IsNotEmpty({ message: 'The recipient is email is required' })
  to: string

  @IsString({ message: 'The subject should be a text' })
  @IsNotEmpty({ message: 'The subject is required' })
  subject: string

  @IsString({ message: 'The message body should be a text' })
  @IsNotEmpty({ message: 'The message body is required' })
  html: string
}
