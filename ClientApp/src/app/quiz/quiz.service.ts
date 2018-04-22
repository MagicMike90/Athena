import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class QuizService {
  private quizzesUrl = 'api/quiz/Latest/';  // URL to web api
  private quizzez = [];

  constructor(private http: HttpClient) { }

  /** GET quizzes from the server */
  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.quizzesUrl)
      .pipe(
        tap(quizzes => console.log(`fetched quizzes`)),
        catchError(this.handleError('getQuizzes', []))
      );
  }

  /** GET quiz by id. Return `undefined` when id not found */
  getQuizNo404<Data>(id: number): Observable<Quiz> {
    const url = `${this.quizzesUrl}/?id=${id}`;
    return this.http.get<Quiz[]>(url)
      .pipe(
        map(quizzes => quizzes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} quiz id=${id}`);
        }),
        catchError(this.handleError<Quiz>(`getQuiz id=${id}`))
      );
  }

  /** GET quiz by id. Will 404 if id not found */
  getQuiz(id: number): Observable<Quiz> {
    const url = `${this.quizzesUrl}/${id}`;
    return this.http.get<Quiz>(url).pipe(
      tap(_ => console.log(`fetched quiz id=${id}`)),
      catchError(this.handleError<Quiz>(`getQuiz id=${id}`))
    );
  }

  /* GET quizzes whose name contains search term */
  searchQuizzes(term: string): Observable<Quiz[]> {
    if (!term.trim()) {
      // if not search term, return empty quiz array.
      return of([]);
    }
    return this.http.get<Quiz[]>(`api/quizzes/?name=${term}`).pipe(
      tap(_ => console.log(`found quizzes matching "${term}"`)),
      catchError(this.handleError<Quiz[]>('searchQuizzes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new quiz to the server */
  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.quizzesUrl, quiz, httpOptions).pipe(
      tap((newquiz: Quiz) => console.log(`added quiz w/ id=${newquiz.id}`)),
      catchError(this.handleError<Quiz>('addQuiz'))
    );
  }

  /** DELETE: delete the quiz from the server */
  deleteQuiz(quiz: Quiz | number): Observable<Quiz> {
    const id = typeof quiz === 'number' ? quiz : quiz.id;
    const url = `${this.quizzesUrl}/${id}`;

    return this.http.delete<Quiz>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted quiz id=${id}`)),
      catchError(this.handleError<Quiz>('deleteQuiz'))
    );
  }

  /** PUT: update the quiz on the server */
  updateQuiz(quiz: Quiz): Observable<any> {
    return this.http.put(this.quizzesUrl, quiz, httpOptions).pipe(
      tap(_ => console.log(`updated quiz id=${quiz.id}`)),
      catchError(this.handleError<any>('updateQuiz'))
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
