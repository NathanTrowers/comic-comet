import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MessageComponent } from 'src/app/message/message.component';
import { errorMessage, formMessages, messageClass } from 'src/app/message/message.constants';
import { MessageService } from 'src/app/message/message.service';
import { InfoComponent } from 'src/app/message/info/info.component';
import { OrderService } from 'src/app/order/order.service';
import { OrrderValidator } from 'src/app/order/order.validator';
import Address from 'src/app/order/interfaces/Address';
import AddressResponse from 'src/app/order/interfaces/AddressResponse';

@Component({
  selector: 'app-address-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    InfoComponent,
    MessageComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './address-confirmation.component.html',
  styleUrls: ['./address-confirmation.component.css']
})
export class AddressConfirmationComponent implements OnInit{
  // error: boolean = false;
  oldAddress!: Address;
  addressConfirmationForm = new FormGroup({
    address:    new FormControl(),
    city:       new FormControl(),
    postalCode: new FormControl(),
    country:    new FormControl(),
  });
  messages = formMessages;

  constructor(
    private orderService: OrderService,
    private orderValidator: OrrderValidator,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderService.getCustomerAddress()
      .subscribe((savedAddress: AddressResponse) => {
        this.addressConfirmationForm = new FormGroup({
          address:    new FormControl(savedAddress.address),
          city:       new FormControl(savedAddress.city),
          postalCode: new FormControl(savedAddress.postalCode),
          country:    new FormControl(savedAddress.country)
        });

        this.oldAddress = savedAddress;
      });
  }

  onSubmitAddressConfirmation(): void {
    const addressToUpdate: Address = {
      address:    this.addressConfirmationForm.value.address,
      city:       this.addressConfirmationForm.value.city,
      postalCode: this.addressConfirmationForm.value.postalCode,
      country:    this.addressConfirmationForm.value.country
    }
    
    if (
      !(this.oldAddress.address === addressToUpdate.address
      && this.oldAddress.city === addressToUpdate.city
      && this.oldAddress.postalCode === addressToUpdate.postalCode
      && this.oldAddress.country === addressToUpdate.country)
    ) {
      if (this.orderValidator.validateAddress(addressToUpdate)) {
        this.orderService.updateCustomerAddress(addressToUpdate)
          .subscribe(response => {
            if (response.address === '') {
              this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_GENERIC);              
            
              return;
            }
            
            this.router.navigate(['/order-confirmation']);            
          });
      } else {
        this.messageService.setMessage(messageClass.ERROR, errorMessage.ERROR_WRONG_INPUT);
      }
    } else {
      this.router.navigate(['/order-confirmation']);
    }
  }
}
