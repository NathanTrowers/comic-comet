import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../authentication/authentication.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
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

  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    this.token = this.authenticationService.httpOptions.headers['Authorization'];
  }

  logout(): void {
    this.authenticationService.requestLogout()
      .subscribe(received => {
        this.invalidToken = received.invalidToken
        if (this.token === this.invalidToken) {
          this.cssClass = 'error';
          this.message = 'An error occurred. Try again.';
  
          return;
        }
  
        this.authenticationService.isLoggedIn = false;
        this.router.navigate([this.authenticationService.loginUrl]);
      });
  }
}
