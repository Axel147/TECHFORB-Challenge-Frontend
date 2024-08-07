import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ValidationsService } from 'src/app/shared/services/validations/validations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;

  loginForm!: FormGroup;

  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private validatorService:ValidationsService
    ) {
    }

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\wáéíóúüñ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/i)]],
      });
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(){
    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authService.login(formValue).subscribe( res => {
        if(res){
          this.router.navigate(['/home'])
        }
      })
    );
  }

  get formControls() {
    return this.loginForm.controls;
  }

  getErrorMessage(field:string): string{
    return this.validatorService.getErrorMessage(field, this.loginForm);
  }

  isValidField(field:string): boolean{
    return this.validatorService.isValidField(field, this.loginForm);
  }

  navigate(){
    this.router.navigate(['/sign-in']);
  }

}
