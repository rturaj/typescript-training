export interface ValidationInput {
  name: string;
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface ValidationResult {
  isValid: boolean,
  errorMessages: string[]
}

export function validate(input: ValidationInput) {
  let result: ValidationResult = {
    isValid: true,
    errorMessages: []
  };

  if (input.required) {
    const isValid = input.value.toString().trim().length > 0
    if (!isValid) result.errorMessages.push(`[Validation]: ${input.name} is required`);
    result.isValid = result.isValid && isValid;
  }

  if (input.minLength != null && typeof input.value === 'string') {
    const isValid =
      input.value.length >= input.minLength;
    if (!isValid) result.errorMessages.push(`[Validation]: min length of the ${input.name} is ${input.minLength}, but provided value with length: ${input.value.length}`);
    result.isValid = result.isValid && isValid;
  }

  if (input.maxLength != null && typeof input.value === 'string') {
    const isValid =
      input.value.length <= input.maxLength;
    if (!isValid) result.errorMessages.push(`[Validation]: max length of the ${input.name} is ${input.minLength}, but provided value with length: ${input.value.length}`);
    result.isValid = result.isValid && isValid;
  }

  if (input.min != null && typeof input.value === 'number') {
    const isValid =
      input.value >= input.min;
    if (!isValid) result.errorMessages.push(`[Validation]: min of the ${input.name} is ${input.min}, but provided value is: ${input.value}`);
    result.isValid = result.isValid && isValid;
  }

  if (input.max != null && typeof input.value === 'number') {
    const isValid =
      input.value <= input.max;
    if (!isValid) result.errorMessages.push(`[Validation]: max of the ${input.name} is ${input.max}, but provided value is: ${input.value}`);
    result.isValid = result.isValid && isValid;
  }



  return result;
}
