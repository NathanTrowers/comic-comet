import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicBookCatalogueComponent } from 'src/app/comic-book/comic-book-catalogue/comic-book-catalogue.component';

describe('ComicBookCatalogueComponent', () => {
  let component: ComicBookCatalogueComponent;
  let fixture: ComponentFixture<ComicBookCatalogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ComicBookCatalogueComponent],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
    fixture = TestBed.createComponent(ComicBookCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
