import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, DashboardComponent],
      providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub }]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
