import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../shared/shared.module';

import { QuizModule } from '../quiz/quiz.module';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    QuizModule
  ],
  declarations: [DashboardComponent],
  exports: [
    DashboardComponent
  ],
  providers: [

  ],
})
export class DashboardModule { }
