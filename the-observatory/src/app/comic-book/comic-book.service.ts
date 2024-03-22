import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import ComicBookCatalogue from 'src/app/comic-book/interfaces/ComicBookCatalogue';
import { environment } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class ComicBookService {
  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}

  getComicBookCatalogue(): Observable<ComicBookCatalogue> {
    this.authenticationService.setAuthorization();

    return this.httpClient.get<ComicBookCatalogue>(`${environment.METEOR_SHOWER_API}/comic-books`, this.authenticationService.httpOptions)
      .pipe(
        catchError(this.handleError<ComicBookCatalogue>('all-comic-books'))
      );
  }

  getComicBookById(comicBookId: string): Observable<any> {
    this.authenticationService.setAuthorization();

    return this.httpClient.get<any>(`${environment.METEOR_SHOWER_API}/comic-books/${comicBookId}`,this.authenticationService.httpOptions)
      .pipe(
        catchError(this.handleError<any>('single-comic-book'))
      );
  }

  getSrcString(coverArt: string): string {
    if (coverArt?.length > 0) {
      const coverArtString: string = coverArt?.toString() ?? '';

      return `data:image/png;base64,${coverArtString}`;
    }
    
    return '/assets/cover-coming-soon.png';
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
