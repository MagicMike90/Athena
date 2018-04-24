import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QuizService } from '../quiz.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent implements OnInit {

  title: string;
  quiz: Quiz;

  // this will be TRUE when editing an existing quiz,
  // FALSE when creating a new one.
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private location: Location) {

    // create an empty object from the Quiz interface
    this.quiz = <Quiz>{};

    const id = +this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.editMode = true;
      this.quizService.getQuiz(id).subscribe(quiz => this.quiz = quiz);
    } else {
      this.editMode = false;
      this.title = 'Create a new Quiz';
    }
  }
  ngOnInit() {

  }
  onSubmit(quiz: Quiz) {
    if (this.editMode) {
      this.quizService.updateQuiz(quiz).subscribe(res => {
        console.log('Quiz ' + res + ' has been updated.');
        // this.router.navigate(['home']);
        this.goBack();
      });

    } else {
      this.quizService.addQuiz(quiz).subscribe(res => {
        console.log('Quiz ' + res + ' has been created.');
        // this.router.navigate(['home']);
        this.goBack();
      });
    }
  }
  goBack(): void {
    this.location.back();
  }
  // onBack() {
  //   this.router.navigate(['home']);
  // }
}
