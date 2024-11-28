import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-info',
    imports: [CommonModule],
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input() bubbleText!: string;

  constructor() {}
}
