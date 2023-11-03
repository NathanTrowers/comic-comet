import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

import LoginResponse from './interfaces/response/LoginResponse';
import { Observable, catchError, of, tap } from 'rxjs';
import LoginCredentials from './interfaces/request/LoginCredentials';
import { environment } from '../../environments/environments';
import LogoutResponse from './interfaces/response/LogoutResponse';
import RegistrationCredentials from './interfaces/request/RegistrationCredentials';
import RegistrationResponse from './interfaces/response/RegistrationResponse';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  httpOptions = {
    headers: { 
      'Conent-Type': 'application/json',
      'Authorization': ''
     }
  };
  isLoggedIn: boolean = false;
  redirectUrl: string | undefined = '/dashboard';
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
