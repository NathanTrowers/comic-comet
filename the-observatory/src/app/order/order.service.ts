import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import Address from 'src/app/order/interfaces/Address';
import Order from 'src/app/order/interfaces/Order';
import AddressResponse from 'src/app/order/interfaces/AddressResponse';
import { environment } from 'src/environments/environments';


@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}

  getCustomerAddress(): Observable<AddressResponse> {
    this.authenticationService.setAuthorization();

    return this.httpClient.get<AddressResponse>(`${environment.METEOR_SHOWER_API}/customer/address`, this.authenticationService.httpOptions)
      .pipe(
        catchError(this.handleError<AddressResponse>('get-current-customer-address'))
      );
  }

  updateCustomerAddress(addressToUpdate: Address): Observable<any> {
    this.authenticationService.setAuthorization();

    return this.httpClient.patch<any>(`${environment.METEOR_SHOWER_API}/customer/address`, addressToUpdate, this.authenticationService.httpOptions)
      .pipe(
        catchError(this.handleError<any>('update-current-customer-address'))
      );
  }

  postOrder(newOrder: Order[]): Observable<any> {
    this.authenticationService.setAuthorization();

    return this.httpClient.post<any>(`${environment.METEOR_SHOWER_API}/order/new`, newOrder, this.authenticationService.httpOptions)
      .pipe(
        catchError(this.handleError<any>('post-new-order'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
