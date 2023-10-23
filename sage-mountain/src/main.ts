import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import routeConfig from './app/routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent,
    {
      providers: [
        provideProtractorTestingSupport(),
        provideRouter(routeConfig),
        provideHttpClient()
      ]
    }
  )
  .catch(err => console.error(err));
