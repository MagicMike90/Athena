import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { LoginComponent } from './login-form/login.component';
import { RegisterComponent } from './register-form/register.component';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    UserRoutingModule
  ],
  declarations: [LoginComponent, RegisterComponent, FacebookLoginComponent]
})
export class UserModule { }
