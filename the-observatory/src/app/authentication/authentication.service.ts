import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { Observable, catchError, of, tap } from 'rxjs';

import LoginCredentials from 'src/app/authentication/interfaces/request/LoginCredentials';
import RegistrationCredentials from 'src/app/authentication/interfaces/request/RegistrationCredentials';
import LoginResponse from 'src/app/authentication/interfaces/response/LoginResponse';
import LogoutResponse from 'src/app/authentication/interfaces/response/LogoutResponse';
import RegistrationResponse from 'src/app/authentication/interfaces/response/RegistrationResponse';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  httpOptions = {
    headers: { 
      'Conent-Type': 'application/json',
      'Authorization': ''
     }
  };
  redirectUrl: string | undefined = '/comic-books';
  loginUrl: string = '/login';
  fourthWallApi: string = environment.FOURTH_WALL_API;
  
  constructor(private httpClient: HttpClient) {}
  
  submitLogin(loginCredentials: LoginCredentials): Observable<LoginResponse> {
    loginCredentials.email = Buffer.from(loginCredentials.email)
      .toString('base64');
    loginCredentials.password = Buffer.from(loginCredentials.password)
      .toString('base64');

    return this.httpClient.post<LoginResponse>(`${this.fourthWallApi}/login`, loginCredentials, this.httpOptions)
      .pipe(
        catchError(this.handleError<LoginResponse>('login'))
      );
  }

  submitRegistration(registrationCredentials: RegistrationCredentials): Observable<RegistrationResponse> {
    registrationCredentials.email = Buffer.from(registrationCredentials.email)
      .toString('base64');
    registrationCredentials.name = Buffer.from(registrationCredentials.name)
      .toString('base64');
    registrationCredentials.password = Buffer.from(registrationCredentials.password)
      .toString('base64');

    return this.httpClient.post<RegistrationResponse>(`${this.fourthWallApi}/register`, registrationCredentials, this.httpOptions)
      .pipe(
        catchError(this.handleError<RegistrationResponse>('register'))
      );
  }
  
  requestLogout(): Observable<LogoutResponse> {
    return this.httpClient.post<LogoutResponse>(`${this.fourthWallApi}/logout`, {}, this.httpOptions)
      .pipe(
        tap(() => this.redirectUrl = '/dashboard'),
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
