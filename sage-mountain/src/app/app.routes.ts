import { Routes } from '@angular/router';

import { authenticationGuard } from 'src/app/authentication/authentication.guard';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'dashboard', component: DashboardComponent, title: 'Dashboard', canActivate: [authenticationGuard] },
    // { path: 'comic-book/:id', component: ComicBookDetailsComponent, title: 'Comic Book Details', canActivate: [authenticationGuard] },
    { path: '', redirectTo: 'Login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, title:  'Page Not Found' }
];

export default routes;
