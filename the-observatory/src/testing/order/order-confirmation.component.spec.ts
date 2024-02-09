import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmationComponent } from 'src/app/order/order-confirmation/order-confirmation.component';

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OrderConfirmationComponent]
    });
    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
