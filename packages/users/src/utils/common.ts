import { readFileSync } from 'fs'
import handlebars from 'handlebars'

export const generateCode = (length = 6) => {
  const add = 1
  let max = 12 - add

  if (length > max) {
    return generateCode(max) + generateCode(length - max)
  }

  max = Math.pow(10, length + add)
  const min = max / 10
  const number = Math.floor(Math.random() * (max - min + 1)) + min

  return ('' + number).substring(add)
}

export const getEmailTemplate = (path: string, context: object) => {
  const mail_file = readFileSync(path, 'utf8')
  const compiled_template = handlebars.compile(mail_file)
  const template = compiled_template(context)

  return template
}
