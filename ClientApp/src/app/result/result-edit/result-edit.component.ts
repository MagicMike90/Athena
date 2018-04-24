import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-result-edit',
  templateUrl: './result-edit.component.html',
  styleUrls: ['./result-edit.component.css']
})
export class ResultEditComponent implements OnInit {
  title: string;
  result: Result;

  // this will be TRUE when editing an existing result,
  // FALSE when creating a new one.
  editMode: boolean;

  constructor(private activatedRoute: ActivatedRoute, private resultService: ResultService, private router: Router) {

    // create an empty object from the Quiz interface
    this.result = <Result>{};
  }
  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params['id'];

    // check if we're in edit mode or not
    this.editMode = (this.activatedRoute.snapshot.url[1].path === 'edit');

    if (this.editMode) {
      this.resultService.getResult(id).subscribe(result => this.result = result);
    } else {
      this.result.QuizId = id;
      this.title = 'Create a new Result';
    }
  }

  onSubmit(result: Result) {
    if (this.editMode) {
      this.resultService.addResult(result).subscribe(res => {
        console.log('Result ' + res.Id + ' has been updated.');
        this.router.navigate(['quiz/edit', res.QuizId]);
      });
    } else {
      this.resultService.updateResult(result).subscribe(res => {
        console.log('Result ' + res.Id + ' has been updated.');
        this.router.navigate(['quiz/edit', res.QuizId]);
      });
    }
  }

  onBack() {
    this.router.navigate(['quiz/edit', this.result.QuizId]);
  }
}
