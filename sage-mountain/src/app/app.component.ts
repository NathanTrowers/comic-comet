import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './authentication/login/login.component';
import { MessageComponent } from './message/message.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoginComponent,
    MessageComponent,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = 'sage-mountain';

  constructor() {}
}
