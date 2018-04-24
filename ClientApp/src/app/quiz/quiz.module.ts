import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizService } from './quiz.service';
import { QuizComponent } from './quiz/quiz.component';

import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { QuestionModule } from '../question/question.module';
import { ResultModule } from '../result/result.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,

    QuizRoutingModule,
    QuestionModule,
    ResultModule
  ],
  providers: [
    QuizService
  ],
  declarations: [QuizListComponent, QuizComponent, QuizEditComponent],
  exports: [
    QuizListComponent
  ],
})
export class QuizModule { }
