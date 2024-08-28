import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ContactFormValidator } from 'src/app/contact-us/contact-form.validdator';
import { ContactUsService } from 'src/app/contact-us/contact-us.service';
import Correspondence from 'src/app/contact-us/interfaces/Correspondence';
import { MessageComponent } from 'src/app/message/message.component';
import { errorMessage, formMessages, messageClass } from 'src/app/message/message.constants';
import { MessageService } from 'src/app/message/message.service';
import { InfoComponent } from 'src/app/message/info/info.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    InfoComponent,
    MessageComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm = new FormGroup({
    subject:  new FormControl(''),
    text:     new FormControl('')
  });
  messages = formMessages;

  constructor(
    private authenticationService: AuthenticationService,
    private contactFormValidator: ContactFormValidator,
    private contactUsService: ContactUsService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmitContactForm(): void {
    const correspondence: Correspondence  = {
      subject:  this.contactForm.value.subject ?? '',
      text:     this.contactForm.value.text ?? ''
    }

    if (this.contactFormValidator.validate(correspondence)) {
      this.contactUsService.submitContactForm(correspondence)
        .subscribe((received: any) => {
          if (received.status === 202) {
            this.router.navigate([this.authenticationService.redirectUrl]);

            return;
          }

          this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_GENERIC);
        });
    } else {
      this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_WRONG_INPUT);
    }
  }
}
