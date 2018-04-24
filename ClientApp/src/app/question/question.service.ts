import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class QuestionService {
  private questionUrl = 'api/question';  // URL to web api
  private quizzez = [];


  constructor(private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.questionUrl = `${origin}${this.questionUrl}`;
  }

  /** GET quizzes from the server */
  getQuestions(id: number): Observable<Question[]> {
    const url = `${this.questionUrl}/All/${id}`;
    return this.http.get<Question[]>(url)
      .pipe(
        tap(quizzes => console.log(`fetched quizzes by date`)),
        catchError(this.handleError('getQuestionzes', []))
      );
  }

  /** GET question by id. Return `undefined` when id not found */
  getQuestionNo404<Data>(id: number): Observable<Question> {
    const url = `${this.questionUrl}/?id=${id}`;
    return this.http.get<Question[]>(url)
      .pipe(
        map(quizzes => quizzes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} question id=${id}`);
        }),
        catchError(this.handleError<Question>(`getQuestion id=${id}`))
      );
  }

  /** GET question by id. Will 404 if id not found */
  getQuestion(id: number): Observable<Question> {
    const url = `${this.questionUrl}/${id}`;
    return this.http.get<Question>(url).pipe(
      tap(_ => console.log(`fetched question id=${id}`)),
      catchError(this.handleError<Question>(`getQuestion id=${id}`))
    );
  }

  /* GET quizzes whose name contains search term */
  searchQuestionzes(term: string): Observable<Question[]> {
    if (!term.trim()) {
      // if not search term, return empty question array.
      return of([]);
    }
    return this.http.get<Question[]>(`api/quizzes/?name=${term}`).pipe(
      tap(_ => console.log(`found quizzes matching "${term}"`)),
      catchError(this.handleError<Question[]>('searchQuestionzes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new question to the server */
  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionUrl, question, httpOptions).pipe(
      tap((newquiz: Question) => console.log(`added question w/ id=${newquiz.Id}`)),
      catchError(this.handleError<Question>('addQuestion'))
    );
  }

  /** DELETE: delete the question from the server */
  deleteQuestion(question: Question | number): Observable<Question> {
    const id = typeof question === 'number' ? question : question.Id;
    const url = `${this.questionUrl}/${id}`;

    return this.http.delete<Question>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted question id=${id}`)),
      catchError(this.handleError<Question>('deleteQuestion'))
    );
  }

  /** PUT: update the question on the server */
  updateQuestion(question: Question): Observable<any> {
    return this.http.put(this.questionUrl, question, httpOptions).pipe(
      tap(_ => console.log(`updated question id=${question.Id}`)),
      catchError(this.handleError<any>('updateQuestion'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
