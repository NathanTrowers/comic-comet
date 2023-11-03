import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from 'src/app/message/message.component';
import { AuthenticationService } from '../authentication.service';
import { MessageService } from 'src/app/message/message.service';
import { Router, RouterModule } from '@angular/router';
import RegistrationCredentials from '../interfaces/request/RegistrationCredentials';
import { RegistrationValidator } from './registration.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessageComponent,
    RouterModule
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
