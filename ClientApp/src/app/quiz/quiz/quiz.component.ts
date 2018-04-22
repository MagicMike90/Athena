import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  public quiz: Quiz;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) {

    // create an empty object from the Quiz interface
    this.quiz = <Quiz>{};

    const id = +this.activatedRoute.snapshot.params['id'];
    console.log(id);
    if (id) {
    } else {
      console.log('Invalid id: routing back to home...');
      this.router.navigate(['home']);
    }
  }
  ngOnInit() {

  }
}
