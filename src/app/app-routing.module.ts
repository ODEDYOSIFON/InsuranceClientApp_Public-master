import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { InsurancePolicyFormComponent } from './insurance-policy-form/insurance-policy-form.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'users', component: UserListComponent },
 
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users' }  // Catch-all route for invalid URLs

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
