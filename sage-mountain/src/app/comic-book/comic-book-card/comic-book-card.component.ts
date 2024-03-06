import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

import ComicBook from 'src/app/comic-book/interfaces/ComicBook';

@Component({
  selector: 'app-comic-book-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './comic-book-card.component.html',
  styleUrls: ['./comic-book-card.component.css']
})
export class ComicBookCardComponent {
  @Input() comicBook!: ComicBook;
  @Output() deleteComicBookEvent: EventEmitter<ComicBook> = new EventEmitter<ComicBook>;
  coverArt: string = '';
  
  constructor() {}

  getSrcString(): string {
    if (this.comicBook?.coverArt?.length > 0) {
      const coverArtString: string = this.comicBook.coverArt?.toString() ?? '';
      this.coverArt = `data:image/png;base64,${coverArtString}`;

      return this.coverArt;
    }
    
    return '';
  }

  deleteComicBook(): void {
    this.deleteComicBookEvent.emit(this.comicBook);
  }

}
