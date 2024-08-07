import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  checkPasswords (otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;
    return function checkPasswords (control: FormControl) {
      if (!control.parent) {
        return null;
      }
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('checkPasswords(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }
      if (!otherControl) {
        return null;
      }
      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true
        };
      }
      return null;
    }
  }

  getErrorMessage(field:string, form:FormGroup): string{
    let message = '';

    if (form.get(field)!.errors?.['required']){
      message = 'Este campo no puede estar vacío';
    }else if(form.get(field)!.hasError('pattern')){
      if(field == 'email'){
        message = 'El Email no es válido';
      }else if (field == 'password' || field == 'confirmPassword'){
        message = 'La contraseña no es válida';
      }else{
        message = 'Los caracteres ingresados en el campo no son válidos';
      }
    }else if(form.get(field)?.hasError('minlength')){
      const minLength = form.get(field)!.errors?.['minlength'].requiredLength;
      message = `Este campo no puede tener menos de ${minLength} caracteres`;
    }else if(form.get(field)?.hasError('maxlength')){
      const maxLength = form.get(field)!.errors?.['maxlength'].requiredLength;
      message = `Este campo no puede tener más de ${maxLength} caracteres`;
    }

    return message;
  }

  isValidField(field:string, form:FormGroup): boolean{
    return (
      (form.get(field)!.touched ||
      form.get(field)!.dirty) &&
      !form.get(field)!.valid
    );
  }

}
