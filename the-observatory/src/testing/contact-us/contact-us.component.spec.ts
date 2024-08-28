import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ContactUsComponent } from 'src/app/contact-us/contact-us.component';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContactUsComponent, HttpClientModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }]
    });
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
