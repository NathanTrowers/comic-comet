import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { NewComicBookComponent } from 'src/app/comic-book/new-comic-book/new-comic-book.component';

describe('NewComicBookComponent', () => {
  let component: NewComicBookComponent;
  let fixture: ComponentFixture<NewComicBookComponent>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, NewComicBookComponent],
      providers: [ { provide: ActivatedRoute, useValue: activatedRouteStub }]
    });
    fixture = TestBed.createComponent(NewComicBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
