import * as bcrypt from 'bcryptjs'

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 8)
}

export const validatePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword)
}
