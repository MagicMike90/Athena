import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  title: string;
  question: Question;

  // this will be TRUE when editing an existing question,
  // FALSE when creating a new one.
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService, private router: Router) {

    // create an empty object from the Quiz interface
    this.question = <Question>{};

    const id = +this.activatedRoute.snapshot.params['id'];

    // check if we're in edit mode or not
    this.editMode = (this.activatedRoute.snapshot.url[1].path === 'edit');

    if (this.editMode) {
      this.questionService.getQuestion(id).subscribe(question => this.question = question);
    } else {
      this.question.QuizId = id;
      this.title = 'Create a new Question';
    }
  }
  ngOnInit() {

  }

  onSubmit(question: Question) {
    if (this.editMode) {
      this.questionService.addQuestion(question).subscribe(res => {
        console.log('Question ' + res.Id + ' has been updated.');
        this.router.navigate(['quiz/edit', res.QuizId]);
      });
    } else {
      this.questionService.updateQuestion(question).subscribe(res => {
        console.log('Question ' + res.Id + ' has been updated.');
        this.router.navigate(['quiz/edit', res.QuizId]);
      });
    }
  }

  onBack() {
    this.router.navigate(['quiz/edit', this.question.QuizId]);
  }
}
