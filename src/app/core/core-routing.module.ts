import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { LoginComponent } from './login/login.component';
import { checkLoginGuard } from '../shared/guards/checkLogin/check-login.guard';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '', component: CoreComponent, children:
    [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, /*canActivate: [checkLoginGuard]*/ },
      { path: 'sign-in', component: SignInComponent, /*canActivate: [checkLoginGuard]*/ },
      { path: 'dashboard', loadChildren: () => import('../private/private.module').then(m => m.PrivateModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
