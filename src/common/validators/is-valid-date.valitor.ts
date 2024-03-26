import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'datePattern', async: false })
export class DatePatternValidator implements ValidatorConstraintInterface {
  defaultMessage({property}) {
    return `${property} format should be yyyy-mm-dd pattern.`;
  }

  validate(value: any) {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    return pattern.test(value);
  }
}

export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DatePatternValidator,
    });
  };
}
