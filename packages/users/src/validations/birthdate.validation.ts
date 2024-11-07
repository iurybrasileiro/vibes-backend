import { Injectable } from '@nestjs/common'

import {
  registerDecorator,
  ValidatorConstraint,
  type ValidationArguments,
  type ValidationOptions,
  type ValidatorConstraintInterface,
} from 'class-validator'
import { isBefore, subYears } from 'date-fns'

// eslint-disable-next-line @typescript-eslint/naming-convention
export function IsBirthdateValid(
  age: number,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsBirthdateValid',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: ValidateBirthdate,
      constraints: [age],
    })
  }
}

@ValidatorConstraint({ name: 'IsBirthdateValid', async: false })
@Injectable()
class ValidateBirthdate implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    const [age] = args.constraints
    const birthdate = new Date(value)
    const minBirthdate = subYears(new Date(), +age)
    const isGreaterThan = isBefore(birthdate, minBirthdate)

    return isGreaterThan
  }
}
