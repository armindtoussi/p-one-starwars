import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[min]', //MUST reg the validator through ng_validators.
  providers: [{provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true}]

})

export class MinValidatorDirective implements Validator {

  @Input() min: number;

  constructor() { }


  //control obj grabs the data from the template.
  validate(control: AbstractControl): ValidationErrors {
    const currentValue = control.value;
    const isValid      = currentValue >= this.min;

    return isValid ? null : {
      min: {
        valid: false
      }
    };
  }
}
