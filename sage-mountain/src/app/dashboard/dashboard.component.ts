import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ComicBookCatalogueComponent } from 'src/app/comic-book/comic-book-catalogue/comic-book-catalogue.component';
import { MessageComponent } from 'src/app/message/message.component';
import { errorMessage, messageClass } from 'src/app/message/message.constants';
import { MessageService } from 'src/app/message/message.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ComicBookCatalogueComponent,
    MessageComponent,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  token: string | null  = '';
  invalidToken: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private router: Router

  ) {
    this.token = this.authenticationService.httpOptions.headers['Authorization'];
  }

  logout(): void {
    this.authenticationService.requestLogout()
      .subscribe(received => {
        this.invalidToken = received.invalidToken
        if (this.token === this.invalidToken) {
          this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_GENERIC);
  
          return;
        }
  
        this.authenticationService.deleteToken();
        this.router.navigate([this.authenticationService.loginUrl]);
      });
  }
}
