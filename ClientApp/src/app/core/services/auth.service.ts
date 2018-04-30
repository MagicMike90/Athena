import { EventEmitter, Inject, Injectable, PLATFORM_ID, Optional } from '@angular/core';
import { APP_BASE_HREF, isPlatformBrowser } from '@angular/common';
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
  private authTokenUrl = 'api/token/auth';  // URL to web api
  private facebookTokenUrl = 'api/token/facebook';

  authKey = 'auth';
  clientId = 'Athena';

  constructor(private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string,
    @Inject(PLATFORM_ID) private platformId: any) {
    this.authTokenUrl = `${origin}${this.authTokenUrl}`;
    this.facebookTokenUrl = `${origin}${this.facebookTokenUrl}`;
  }

  // performs the login
  login(username: string, password: string): Observable<TokenResponse> {
    const data = {
      username: username,
      password: password,
      client_id: this.clientId,
      // required when signing up with username/password
      grant_type: 'password',
      // space-separated list of scopes for which the token is issued
      scope: 'offline_access profile email'
    };

    return this.getAuthFromServer(this.authTokenUrl, data);
  }

  facebookLogin(data): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.facebookTokenUrl, data, httpOptions).pipe(
      tap((newuser: TokenResponse) => console.log('Login successful.')),
      catchError(handleError<TokenResponse>('facebookLogin'))
    );
  }
  // try to refresh token
  refreshToken(): Observable<TokenResponse> {
    const data = {
      client_id: this.clientId,
      // required when signing up with username/password
      grant_type: 'refresh_token',
      refresh_token: this.getAuth().refresh_token,
      // space-separated list of scopes for which the token is issued
      scope: 'offline_access profile email'
    };

    return this.getAuthFromServer(this.authTokenUrl, data);
  }

  // retrieve the access & refresh tokens from the server
  getAuthFromServer(url: string, data: any): Observable<TokenResponse> {
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
