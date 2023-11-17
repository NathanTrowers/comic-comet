import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from 'src/app/authentication/login/login.component';
import { MessageComponent } from 'src/app/message/message.component';


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
  title: string = 'the-observatory';

  constructor() {}
}
