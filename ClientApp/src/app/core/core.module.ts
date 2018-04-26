import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthService } from './services/auth.service';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    NavMenuComponent,
  ],
  exports: [NavMenuComponent],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }]
})
export class CoreModule { }
