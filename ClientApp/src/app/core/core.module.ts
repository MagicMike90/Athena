import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { AuthRequestInterceptService } from './services/auth.request.intercept.service';
import { AuthResponseInterceptService } from './services/auth.response.intercept.service';
import { RegisterService } from './services/register.service';
import { AuthGuard } from './guards/auth.guard';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { SiteLayoutComponent } from './components/site-layout/site-layout.component';


function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: [
    NavMenuComponent,
    NavBarComponent,
    AppLayoutComponent,
    SiteLayoutComponent,
  ],
  exports: [
    NavMenuComponent,
    NavBarComponent,
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
    RegisterService,
    AuthGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
