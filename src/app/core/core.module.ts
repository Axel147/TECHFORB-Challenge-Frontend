import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { LoginComponent } from './login/login.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CoreComponent,
    LoginComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class CoreModule { }
