import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizComponent } from './quiz/quiz.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';


const routes: Routes = [
    { path: 'quiz/create', component: QuizEditComponent },
    { path: 'quiz/:id', component: QuizComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuizRoutingModule { }
