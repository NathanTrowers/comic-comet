import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import Correspondence from 'src/app/contact-us/interfaces/Correspondence';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactUsService {

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}

  submitContactForm(correspondence: Correspondence): Observable<any> {
    this.authenticationService.setAuthorization();

    return this.httpClient.post<any>(`${environment.SHOOTING_STAR_API}/mail/send`, correspondence, this.authenticationService.httpOptions)
      .pipe(
        catchError(this.handleError<any>('submit-contact-form'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
