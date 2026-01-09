import { Component } from '@angular/core';


import { MessageService } from 'src/app/message/message.service';

@Component({
    selector: 'app-messages',
    imports: [],
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {
  constructor(public messageService: MessageService) {}
}
