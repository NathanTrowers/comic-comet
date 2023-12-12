import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import EditedComicBook from 'src/app/comic-book/interfaces/EditedComicBook';
import ComicBookCatalogue from 'src/app/comic-book/interfaces/ComicBookCatalogue';
import NewComicBookForm from 'src/app/comic-book/interfaces/NewComicBookForm';
import { environment } from 'src/environments/environments';
import ComicBook from './interfaces/ComicBook';

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
        catchError(this.handleError<any>('new-comic-book'))
      );
  }

  submitUpdatedComicBook(comicBookToUpdate: EditedComicBook): Observable<any> {
    this.authenticationService.setAuthorization();

    return this.httpClient.put<any>(`${environment.SAGE_CAVE_API}/comic-books/${comicBookToUpdate.comicBookId}`, comicBookToUpdate, this.authenticationService.httpOptions)
      .pipe(
        catchError(this.handleError<any>('update-comic-book'))
      );
  }

  getComicBookById(comicBookId: string): Observable<any> {
    this.authenticationService.setAuthorization();

    return this.httpClient.get<any>(`${environment.SAGE_CAVE_API}/comic-books/${comicBookId}`,this.authenticationService.httpOptions)
      .pipe(
        catchError(this.handleError<any>('single-comic-book'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
