import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static priceIsRequired(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value === '' || value === null) {
      return { price_not_required: true };
    }
    return null;
  }
  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }
}
