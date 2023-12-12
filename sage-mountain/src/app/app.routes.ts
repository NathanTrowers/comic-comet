import { Routes } from '@angular/router';

import { authenticationGuard } from 'src/app/authentication/authentication.guard';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { EditComicBookComponent } from 'src/app/comic-book/edit-comic-book/edit-comic-book.component';
import { NewComicBookComponent } from 'src/app/comic-book/new-comic-book/new-comic-book.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'dashboard', component: DashboardComponent, title: 'Dashboard', canActivate: [authenticationGuard] },
    { path: 'new', component: NewComicBookComponent, title: 'New Comic Book', canActivate: [authenticationGuard] },
    { path: 'comic-book/:id', component: EditComicBookComponent, title: 'Edit Comic Book', canActivate: [authenticationGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, title:  'Page Not Found' }
];

export default routes;
