import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { AuthService } from './services/auth.service';
import { AuthRequestInterceptService } from './services/auth.request.intercept.service';
import { AuthResponseInterceptService } from './services/auth.response.intercept.service';

import { RegisterService } from './services/register.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    NavMenuComponent,
    NavBarComponent,
    BreadcrumbComponent,
  ],
  exports: [NavMenuComponent, NavBarComponent, BreadcrumbComponent],
  providers: [AuthService,
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
    RegisterService]
})
export class CoreModule { }
