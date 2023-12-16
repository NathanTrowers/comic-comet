import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { ComicBookService } from 'src/app/comic-book/comic-book.service';
import ComicBook from 'src/app/comic-book/interfaces/ComicBook';


@Component({
  selector: 'app-single-comic-book',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './single-comic-book.component.html',
  styleUrls: ['./single-comic-book.component.css']
})
export class SingleComicBookComponent implements OnInit {
  comicBook!: ComicBook;

  constructor(private comicBookService: ComicBookService, private route: ActivatedRoute) {
    this.comicBookService = comicBookService;
    this.route = route;
  }

  ngOnInit(): void {
    const comicBookId: string = String(this.route.snapshot.paramMap.get('id'));
    this.comicBookService.getComicBookById(comicBookId)
      .subscribe( (comicBook: ComicBook) => {
        this.comicBook = comicBook;
      });
  }

  getSrcString(): string {
    if (this.comicBook?.coverArt?.length > 0) {
      const coverArtString: string = this.comicBook.coverArt?.toString() ?? '';

      return `data:image/png;base64,${coverArtString}`;
    }
    
    return '';
  }
}
