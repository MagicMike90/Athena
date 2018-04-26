import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import handleError from '../http.error.handler';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Application-Names': ['store', 'auth']
  })
};

@Injectable()
export class AuthService {

  authKey = 'auth';
  clientId = 'Athena';

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any) {
  }

  // performs the login
  login(username: string, password: string): Observable<TokenResponse> {
    const url = 'api/token/auth';
    const data = {
      username: username,
      password: password,
      client_id: this.clientId,
      // required when signing up with username/password
      grant_type: 'password',
      // space-separated list of scopes for which the token is issued
      scope: 'offline_access profile email'
    };

    return this.http.post<TokenResponse>(url, data, httpOptions).pipe(
      tap(token => this.setAuth(token)),
      catchError(handleError<TokenResponse>('getToken'))
    );
  }

  // performs the logout
  logout(): boolean {
    this.setAuth(null);
    return true;
  }

  // Persist auth into localStorage or removes it if a NULL argument is given
  setAuth(auth: TokenResponse | null): boolean {
    if (auth) {
      localStorage.setItem(
        this.authKey,
        JSON.stringify(auth));
    } else {
      localStorage.removeItem(this.authKey);
    }
    return true;
  }

  // Retrieves the auth JSON object (or NULL if none)
  getAuth(): TokenResponse | null {
    const token = localStorage.getItem(this.authKey);
    if (token) {
      return JSON.parse(token);
    } else {
      return null;
    }
  }

  // Returns TRUE if the user is logged in, FALSE otherwise.
  isLoggedIn(): boolean {
    return localStorage.getItem(this.authKey) != null;
  }

}
