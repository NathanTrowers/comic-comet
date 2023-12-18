import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from 'src/app/cart/cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartComponent, HttpClientModule]
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
