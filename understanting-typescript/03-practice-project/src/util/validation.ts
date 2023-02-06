// INFO Validation
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export const validate = function (validatableInput: Validatable) {
  let isValid = true;

  const { value, required, minLength, maxLength, min, max } = validatableInput;

  const valueLength = value.toString().trim().length;

  if (required) {
    isValid = isValid && value.toString().trim().length !== 0;
  }

  if (minLength && typeof value === 'string') {
    isValid = isValid && valueLength >= minLength;
  }

  if (maxLength && typeof value === 'string') {
    isValid = isValid && valueLength <= maxLength;
  }

  // min != null - check for null and undefined; min might be 0!
  if (min != null && typeof value === 'number') {
    isValid = isValid && value >= min;
  }

  if (max && typeof value === 'number') {
    isValid = isValid && value <= max;
  }

  return isValid;
};
