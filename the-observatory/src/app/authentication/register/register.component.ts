import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import RegistrationCredentials from 'src/app/authentication/interfaces/request/RegistrationCredentials';
import { RegistrationValidator } from 'src/app/authentication/register/registration.validator';
import { InfoComponent } from 'src/app/message/info/info.component';
import { MessageComponent } from 'src/app/message/message.component';
import { formMessages } from 'src/app/message/message.constants';
import { MessageService } from 'src/app/message/message.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    InfoComponent,
    ReactiveFormsModule,
    MessageComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['../authentication.css']
})
export class RegisterComponent implements OnInit {
  registrationForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
    passwordConfirmation: new FormControl('')
  });
  messages = formMessages;


  constructor(
    private authenticationService: AuthenticationService, 
    private messageService: MessageService,
    private registrationValidator: RegistrationValidator,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn) {
      this.router.navigate([this.authenticationService.redirectUrl]);
    }
  }

  onSubmitRegistration(): void {
    const registrationCredentials: RegistrationCredentials = {
      email: this.registrationForm.value.email ?? '',
      name: this.registrationForm.value.name ?? '',
      password: this.registrationForm.value.password ?? ''
    }

    if (this.registrationValidator.validate(registrationCredentials, this.registrationForm.value.passwordConfirmation ?? '')) {
      this.authenticationService.submitRegistration(registrationCredentials)
        .subscribe(received => {
          if (received.status === 202) {
            this.router.navigate([this.authenticationService.loginUrl]);

            return;
          }
    
          this.messageService.setMessage('error', 'An error occurred. Try again.');
        });
    } else {
      this.messageService.setMessage('error', 'There\'s something alien about what you entered. Try again.');
    }
  }
}
