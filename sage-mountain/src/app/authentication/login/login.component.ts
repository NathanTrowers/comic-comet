import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import LoginCredentials from 'src/app/authentication/interfaces/LoginCredentials';
import { LoginValidator } from 'src/app/authentication/login/login.validator';
import { MessageComponent } from 'src/app/message/message.component';
import { errorMessage, messageClass } from 'src/app/message/message.constants';
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
    email:    new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authenticationService: AuthenticationService, 
    private messageService: MessageService,
    private loginValidator: LoginValidator,
    private router: Router
  ) {}

  ngOnInit(): void {
      if(this.authenticationService.isLoggedIn()) {
        this.router.navigate([this.authenticationService.redirectUrl]);
      }
  }
  
  onSubmitLogin(): void {
    const loginCredentials: LoginCredentials = {
      email:    this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    }

    if (this.loginValidator.validate(loginCredentials)) {
      this.authenticationService.submitLogin(loginCredentials)
        .subscribe(received => {
          if (received.status === 202) {
            this.authenticationService.setIsLoggedIn(`Bearer ${received.response}`);
            this.authenticationService.setAuthorization(`Bearer ${received.response}`);
            
            this.router.navigate([this.authenticationService.redirectUrl]);

            return;
          }

          this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_GENERIC);
        });
    } else {
      this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_INVALID_CREDENTIALS);
    }
  }
}
