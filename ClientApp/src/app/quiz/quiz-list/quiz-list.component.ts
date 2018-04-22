import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  title: string;
  selectedQuiz: Quiz;
  quizzes: Quiz[];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.title = 'Latest Quizzes';

  }

  getQuizes(): void {
    this.quizService.getQuizzes().subscribe(quizzes => this.quizzes = quizzes);
  }

  onSelect(quiz: Quiz) {
    this.selectedQuiz = quiz;
    console.log('quiz with Id '
      + this.selectedQuiz.id
      + 'has been selected.');
  }
}
