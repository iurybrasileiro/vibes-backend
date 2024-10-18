import { type ValidationError } from '@nestjs/common'

export const parseValidationPipe = (errors: ValidationError[]) => {
  const firstError = errors[0]

  if (!firstError) return undefined

  if (firstError.children?.length)
    return parseValidationPipe(firstError.children)

  const messages = Object.values(firstError.constraints)

  if (!messages?.length) return undefined

  const message = messages[0]

  return message
}
