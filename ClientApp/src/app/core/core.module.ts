import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { AuthRequestInterceptService } from './services/auth.request.intercept.service';
import { AuthResponseInterceptService } from './services/auth.response.intercept.service';
import { RegisterService } from './services/register.service';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NavMenuComponent,
    NavBarComponent,
  ],
  exports: [
    NavMenuComponent,
    NavBarComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthRequestInterceptService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthResponseInterceptService,
      multi: true
    },
    RegisterService
  ]
})
export class CoreModule { }
