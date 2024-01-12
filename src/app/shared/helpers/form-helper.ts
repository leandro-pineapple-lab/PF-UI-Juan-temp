import { ValidationError } from "class-validator";

export class FormHelper {
  static isInvalidKeyEntered = (event: any) => {
    const forbiddenKeys = ['-', '+', 'e', 'E'];
    if(forbiddenKeys.includes(event.key)) {
      return true;
    }
    return false;
  }

  static getError = (property: string, constraint: string, errors: ValidationError[]) => {
    if (errors.length > 0){
      const error = errors.find(x => x.property === property);
      if (error){
        const errorConstraint = error?.constraints?.[constraint];
        return errorConstraint ?? '';
      }
    }
    return '';
  }

  static numberValidation(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }
}
