import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from '../answer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.css']
})
export class AnswerEditComponent implements OnInit {
  title: string;
  answer: Answer;
  // this will be TRUE when editing an existing question,
  //  FALSE when creating a new one.
  editMode: boolean;

  constructor(private answerService: AnswerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) {
    // create an empty object from the Quiz interface
    this.answer = <Answer>{};
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const id = +this.activatedRoute.snapshot.params['id'];

    // quick & dirty way to check if we're in edit mode or not
    this.editMode = (this.activatedRoute.snapshot.url[1].path == 'edit');

    if (this.editMode) {
      this.answerService.getAnswer(id);
    } else {
      this.answer.QuestionId = id;
      this.title = 'Create a new Answer';
    }
  }

  onSubmit(answer: Answer) {

    if (this.editMode) {
      this.answerService.updateAnswer(answer).subscribe(res => {
        console.log('Answer ' + res.Id + ' has been updated.');
        this.router.navigate(['question/edit', res.QuestionId]);
      });
    } else {
      this.answerService.addAnswer(answer).subscribe(res => {
        console.log('Answer ' + res.Id + ' has been created.');
        this.router.navigate(['question/edit', res.QuestionId]);
      });
    }
  }

  // onBack() {
  //   this.router.navigate(['question/edit', this.answer.QuestionId]);
  // }
  onBack(): void {
    this.location.back();
  }
}
