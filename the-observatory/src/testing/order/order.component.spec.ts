import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { OrderComponent } from 'src/app/order/order.component';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let activateRouteStub: Partial<ActivatedRoute>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [OrderComponent],
    providers: [{ provide: ActivatedRoute, useValue: activateRouteStub }, provideHttpClient(withInterceptorsFromDi())]
});
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
