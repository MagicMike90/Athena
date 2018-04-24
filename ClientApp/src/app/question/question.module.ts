import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionService } from './question.service';
import { QuestionEditComponent } from './question-edit/question-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,

    QuestionRoutingModule
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
