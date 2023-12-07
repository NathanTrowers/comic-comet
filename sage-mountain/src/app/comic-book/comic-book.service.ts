import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import ComicBookCatalogue from 'src/app/comic-book/interfaces/ComicBookCatalogue';
import NewComicBookForm from 'src/app/comic-book/interfaces/NewComicBookForm';
import { environment } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class ComicBookService {
  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}

  getComicBookCatalogue(): Observable<ComicBookCatalogue> {
    this.authenticationService.setAuthorization();

    return this.httpClient.get<ComicBookCatalogue>(`${environment.SAGE_CAVE_API}/comic-books`, this.authenticationService.httpOptions)
      .pipe(
        catchError(this.handleError<ComicBookCatalogue>('all-comic-books'))
      );
  }

  submitNewComicBook(comicBookToAdd: NewComicBookForm): Observable<any> {
    this.authenticationService.setAuthorization();

    return this.httpClient.post<any>(`${environment.SAGE_CAVE_API}/comic-books/new`, comicBookToAdd, this.authenticationService.httpOptions)
      .pipe(
        catchError(this.handleError<any>('all-comic-books'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
