import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
export * from 'class-validator';

export const validationPipeSchema = async (validationSchema: new () => {}, requestObject: object) => {
  const transformedClass: any = plainToInstance(validationSchema, requestObject);
  const errors = await validate(transformedClass);
  if (errors.length > 0) {
    return errors;
  }
  return true;
};
