import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // @Input() regularExpression
  @Output() filterInput = new EventEmitter<any>()
  @Output() mltiSlctBoxEvtCreated = new EventEmitter<string>();
  @Output() setEmailFormValue = new EventEmitter<String>();
  

  constructor() { }

  getFormFieldErrorMessage(formGroup?: FormGroup, formControlName?: string): string {
    let errorMsg = ''
    if (formControlName === undefined || formGroup?.controls[formControlName] === undefined || formGroup?.controls[formControlName] === null) {
      return ''
    }
    if (formGroup.controls[formControlName].hasError('required')) {
      errorMsg = "Field is required"
    }
    if (formGroup.controls[formControlName].hasError('pattern')) {
      // const pattern = (formGroup.controls[formControlName].errors['pattern'].requiredPattern);
      // const regexObject = this.regex.ALL_REGEXP.find(regExp => (String(regExp.REG_EXP) === String(pattern)))
      // errorMsg = `Invalid - ${regexObject?.ERROR_MSG}`
      errorMsg = "Pattern is Invalid"
    }
    if (formGroup.controls[formControlName].hasError('email')) {
      errorMsg = "Email is Invalid"
    }
    return errorMsg
  }
}
