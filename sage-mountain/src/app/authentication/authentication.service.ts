import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { Observable, catchError, of, tap } from 'rxjs';

import LoginCredentials from 'src/app/authentication/interfaces/LoginCredentials';
import LoginResponse from 'src/app/authentication/interfaces/LoginResponse';
import LogoutResponse from 'src/app/authentication/interfaces/LogoutResponse';
import { environment } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  httpOptions = {
    headers: { 
      'Conent-Type': 'application/json',
      'Authorization': ''
     }
  };
  redirectUrl: string | undefined = '/dashboard';
  loginUrl: string = '/login';
  fourthWallApi: string = environment.FOURTH_WALL_API;
  
  constructor(private httpClient: HttpClient) {}
  
  submitLogin(loginCredentials: LoginCredentials): Observable<LoginResponse> {
    loginCredentials.email = Buffer.from(loginCredentials.email)
      .toString('base64');
    loginCredentials.password = Buffer.from(loginCredentials.password)
      .toString('base64');

    return this.httpClient.post<LoginResponse>(`${this.fourthWallApi}/admin/login`, loginCredentials, this.httpOptions)
      .pipe(
        catchError(this.handleError<LoginResponse>('login'))
      );
  }
  
  requestLogout(): Observable<LogoutResponse> {
    return this.httpClient.post<LogoutResponse>(`${this.fourthWallApi}/logout`, {}, this.httpOptions)
      .pipe(
        tap(() => {
          this.redirectUrl = '/dashboard';

        }),
        catchError(this.handleError<LogoutResponse>('logout'))
      );
  }

  deleteToken(): void {
    sessionStorage.removeItem('token');
  }
  
  setIsLoggedIn(token: string): void {
    sessionStorage.setItem('token', token);
  }

  setAuthorization(token: string = ''): void {
    if (token !== '') {
      this.httpOptions.headers.Authorization = token;

      return;
    }

    this.httpOptions.headers.Authorization = `${sessionStorage.getItem('token')}`;

    return;
  }

  isLoggedIn(): boolean {
    if (sessionStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
