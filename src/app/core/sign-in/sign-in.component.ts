import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ValidationsService } from 'src/app/shared/services/validations/validations.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  hide = true;
  hide2 = true;

  signInForm!:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validatorService:ValidationsService,
    private userService: UserService,
    private toastrService:ToastrService,
    private router: Router,
  ){
    this.signInForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\u00C0-\u017F\s]+$/)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\u00C0-\u017F\s]+$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\wáéíóúüñ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/i)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\wáéíóúüñ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/i), this.validatorService.checkPasswords('password')]],
      },
    );
  }

  registerNewUser(){
    console.log('form is valid?: ', this.signInForm.valid)

    if (this.signInForm.valid){
      const userValue = {
        name: this.signInForm.get('name')?.value,
        lastname: this.signInForm.get('lastname')?.value,
        email: this.signInForm.get('email')?.value,
        password: this.signInForm.get('password')?.value
      };
      /*
      this.userService.newUser(userValue).subscribe((res) => {
        console.log('res: ', res);
        this.toastrService.success('Inicie Sesion con su cuenta', 'Registro Exitoso');
        // this.router.navigate(['/login']);
        this.signInForm.reset();
      }, (error) => {
        this.toastrService.error('No se pudo registrar su usuario, compruebe los datos ingresados y/o intentelo de nuevo más tarde', 'Registro Fallido');
        console.error('Sign In Failed', error);
      }
    );*/
    }
  }

  getErrorMessage(field:string): string{
    return this.validatorService.getErrorMessage(field, this.signInForm);
  }

  isValidField(field:string): boolean{
    return this.validatorService.isValidField(field, this.signInForm);
  }

}
