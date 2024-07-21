import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'user-form', component: DashboardComponent },
  { path: 'user-detail', component: UserDetailComponent },
  { path: '', redirectTo: 'user-form', pathMatch: 'full' },
  { path: '**', redirectTo: 'user-form' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
