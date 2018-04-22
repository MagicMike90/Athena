import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavMenuComponent,
  ],
  exports: [NavMenuComponent],
})
export class CoreModule { }
