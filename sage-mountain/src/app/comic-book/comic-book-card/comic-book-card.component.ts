import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Buffer } from 'buffer';

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
}
