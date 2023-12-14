import { Routes } from '@angular/router';

import { LoginComponent } from 'src/app/authentication/login/login.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { authenticationGuard } from 'src/app/authentication/authentication.guard';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'comic-books', component: DashboardComponent, title: 'Comic Books', canActivate: [authenticationGuard] },
    // { path: 'comic-book/:id', component: SingleComicBookComponent, title: 'Single Comic Book', canActivate: [authenticationGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' }
];/**details, footer, addt-to-cart*/

export default routes
