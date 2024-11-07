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
