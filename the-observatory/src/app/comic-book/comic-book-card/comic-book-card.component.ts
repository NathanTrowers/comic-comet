import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class ComicBookCardComponent{
  @Input() comicBook!: ComicBook;

  constructor() {}
}
