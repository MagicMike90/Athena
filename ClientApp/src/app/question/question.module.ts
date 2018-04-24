import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionService } from './question.service';

import { AnswerModule } from '../answer/answer.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,

    QuestionRoutingModule,
    AnswerModule
  ],
  declarations: [QuestionListComponent, QuestionEditComponent],
  exports: [
    QuestionListComponent
  ],
  providers: [
    QuestionService
  ],
})
export class QuestionModule { }
