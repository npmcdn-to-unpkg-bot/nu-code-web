import { FormGroup, FormControl } from '@angular/forms';

export function emailValidator(control: FormControl): {[key: string]: any} {
  const emailRegex = /[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/i;
  if (control.value && !emailRegex.test(control.value)) {
    return { invalidEmail: true };
  }
}

export function matchingPasswordValidator(
    passwordControlKey: string,
    confirmPasswordControlKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let password = group.controls[passwordControlKey];
    let confirmPassword = group.controls[confirmPasswordControlKey];

    if (password.value !== confirmPassword.value) {
      return { mismatchedPasswords: true };
    }
  }
}

