import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginValidator } from './login.validator';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import LoginCredentials from 'src/app/interfaces/LoginCredentials';
import { MessageComponent } from 'src/app/message/message.component';
import { MessageService } from 'src/app/message/message.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessageComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  cssClass: string = '';
  message: string = '';

  constructor(
    private authenticationService: AuthenticationService, 
    private messageService: MessageService,
    private loginValidator: LoginValidator,
    private router: Router
  ) {}

  ngOnInit(): void {
      if(this.authenticationService.isLoggedIn) {
        this.router.navigate([this.authenticationService.redirectUrl]);
      }
  }
  
  onSubmitLogin(): void {
    const loginCredentials: LoginCredentials = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    }

    if (this.loginValidator.validate(loginCredentials)) {
      this.authenticationService.submitLogin(loginCredentials)
        .subscribe(received => {
          if (received.status === 202) {
            this.authenticationService.httpOptions.headers['Authorization'] = `Bearer ${received.response}`;
            this.authenticationService.isLoggedIn = true;
            this.router.navigate([this.authenticationService.redirectUrl]);

            return;
          }
    
          this.messageService.setMessage('error', 'An error occurred. Try again.');
        });
    } else {
      this.messageService.setMessage('error', 'Invalid credentials. Try again.');
    }
  }
}
