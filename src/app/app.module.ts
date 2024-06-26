import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './user-list/user-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {  HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { InsurancePolicyFormComponent } from './insurance-policy-form/insurance-policy-form.component';
import { UserService } from './services/user.service';
import { InsurancePolicyService } from './services/insurance-policy.service';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { InsurancePolicyFormContainerComponent } from './insurance-policy-form-container/insurance-policy-form-container.component';
import { InsurancePolicyListComponent } from './insurance-policy-list/insurance-policy-list.component';
import { ToastrModule } from 'ngx-toastr';
import { UserListItemComponent } from './user-list-item/user-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    NavBarComponent,
    UserDetailsComponent,
    InsurancePolicyFormComponent,
    UserFormComponent,
    InsurancePolicyFormContainerComponent,
    InsurancePolicyListComponent,
    UserListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
   
    FormsModule
  ],
  providers: [UserService,InsurancePolicyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
