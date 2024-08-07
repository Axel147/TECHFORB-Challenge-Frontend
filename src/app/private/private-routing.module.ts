import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivateComponent } from './private.component';

const routes: Routes = [
  {
    path: '', component: PrivateComponent, children:
    [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', component: DashboardComponent, /*canActivate: [checkLoginGuard]*/ },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
