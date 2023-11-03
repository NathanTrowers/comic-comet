import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MessageService } from 'src/app/message/message.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    NgIf
  ],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  constructor(public messageService: MessageService) {}
}
