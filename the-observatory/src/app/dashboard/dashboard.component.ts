import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ComicBookCatalogueComponent } from 'src/app/comic-book/comic-book-catalogue/comic-book-catalogue.component';
import { MessageComponent } from 'src/app/message/message.component';
import { MessageService } from 'src/app/message/message.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ComicBookCatalogueComponent,
    MessageComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  token: string | null  = '';
  invalidToken: string = '';
  cssClass: string = '';
  message: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.token = this.authenticationService.httpOptions.headers['Authorization'];
  }

  logout(): void {
    this.authenticationService.requestLogout()
      .subscribe(received => {
        this.invalidToken = received.invalidToken
        if (this.token === this.invalidToken) {
          this.messageService.setMessage('error', 'An error occurred. Try again.');
  
          return;
        }
  
        this.authenticationService.isLoggedIn = false;
        this.router.navigate([this.authenticationService.loginUrl]);
      });
  }
}
