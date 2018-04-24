import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionService } from './question.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [QuestionListComponent],
  exports: [
    QuestionListComponent
  ],
  providers: [
    QuestionService
  ],
})
export class QuestionModule { }
