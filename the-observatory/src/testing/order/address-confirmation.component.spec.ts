import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { OrderService } from 'src/app/order/order.service';
import { AddressConfirmationComponent } from 'src/app/order/address-confirmation/address-confirmation.component';
import { ActivatedRoute } from '@angular/router';

describe('AddressConfirmationComponent', () => {
  let component: AddressConfirmationComponent;
  let fixture: ComponentFixture<AddressConfirmationComponent>;
  let activateRouteStub: Partial<ActivatedRoute>
  let getCustomerAddressSpy;

  beforeEach(() => {
    const orderService = jasmine.createSpyObj('OrderService', ['getCustomerAddress']);
    getCustomerAddressSpy = orderService.getCustomerAddress.and.returnValue(of({
      address:    '10 Superhero Way',
      city:       'Sky City',
      postalCode: 'm2z 9p9',
      country:    'Canada',
      _links: {
        self: {
            href: 'http/localhost:8090/customer/address'
        }
      }
    }));

    TestBed.configureTestingModule({
      imports: [AddressConfirmationComponent, HttpClientModule],
      providers: [
        { provide:  ActivatedRoute, useValue: activateRouteStub },
        { provide: OrderService, useValue: orderService }
      ]
    });
    fixture = TestBed.createComponent(AddressConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
