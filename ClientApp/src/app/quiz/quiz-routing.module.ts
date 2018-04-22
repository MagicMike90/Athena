import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizListComponent } from './quiz-list/quiz-list.component';


const routes: Routes = [
    {
        path: 'quiz/:id',
        component: QuizListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuizRoutingModule { }
