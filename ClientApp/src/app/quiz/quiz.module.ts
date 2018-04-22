import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizService } from './quiz.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    QuizService
  ],
  declarations: [QuizListComponent]
})
export class QuizModule { }
