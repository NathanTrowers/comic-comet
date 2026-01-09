
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-info',
    imports: [],
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input() bubbleText!: string;

  constructor() {}
}
