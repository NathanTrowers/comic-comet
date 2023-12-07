import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComicBookComponent } from 'src/app/comic-book/new-comic-book/new-comic-book.component';

describe('NewComicBookComponent', () => {
  let component: NewComicBookComponent;
  let fixture: ComponentFixture<NewComicBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, NewComicBookComponent]
    });
    fixture = TestBed.createComponent(NewComicBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
