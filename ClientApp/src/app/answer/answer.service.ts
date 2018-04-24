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
export class AnswerService {

  private answerUrl = 'api/answer';  // URL to web api
  private quizzez = [];


  constructor(private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.answerUrl = `${origin}${this.answerUrl}`;
  }

  /** GET answers from the server */
  getAnswers(id: number): Observable<Answer[]> {
    const url = `${this.answerUrl}/All/${id}`;
    return this.http.get<Answer[]>(url)
      .pipe(
        tap(answers => console.log(`fetched answers by date`)),
        catchError(this.handleError('getAnswers', []))
      );
  }

  /** GET answer by id. Return `undefined` when id not found */
  getAnswerNo404<Data>(id: number): Observable<Answer> {
    const url = `${this.answerUrl}/?id=${id}`;
    return this.http.get<Answer[]>(url)
      .pipe(
        map(answers => answers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} answer id=${id}`);
        }),
        catchError(this.handleError<Answer>(`getAnswer id=${id}`))
      );
  }

  /** GET answer by id. Will 404 if id not found */
  getAnswer(id: number): Observable<Answer> {
    const url = `${this.answerUrl}/${id}`;
    return this.http.get<Answer>(url).pipe(
      tap(_ => console.log(`fetched answer id=${id}`)),
      catchError(this.handleError<Answer>(`getAnswer id=${id}`))
    );
  }

  /* GET answers whose name contains search term */
  searchAnswers(term: string): Observable<Answer[]> {
    if (!term.trim()) {
      // if not search term, return empty answer array.
      return of([]);
    }
    return this.http.get<Answer[]>(`api/answers/?name=${term}`).pipe(
      tap(_ => console.log(`found answers matching "${term}"`)),
      catchError(this.handleError<Answer[]>('searchAnswers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new answer to the server */
  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.answerUrl, answer, httpOptions).pipe(
      tap((newquiz: Answer) => console.log(`added answer w/ id=${newquiz.Id}`)),
      catchError(this.handleError<Answer>('addAnswer'))
    );
  }

  /** DELETE: delete the answer from the server */
  deleteAnswer(answer: Answer | number): Observable<Answer> {
    const id = typeof answer === 'number' ? answer : answer.Id;
    const url = `${this.answerUrl}/${id}`;

    return this.http.delete<Answer>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted answer id=${id}`)),
      catchError(this.handleError<Answer>('deleteAnswer'))
    );
  }

  /** PUT: update the answer on the server */
  updateAnswer(answer: Answer): Observable<any> {
    return this.http.put(this.answerUrl, answer, httpOptions).pipe(
      tap(_ => console.log(`updated answer id=${answer.Id}`)),
      catchError(this.handleError<any>('updateAnswer'))
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
