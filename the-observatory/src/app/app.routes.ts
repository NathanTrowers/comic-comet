import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { authenticationGuard } from 'src/app/authentication/authentication.guard';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'login' },
    { path: 'register', component: RegisterComponent, title: 'register' },
    { path: 'dashboard', component: DashboardComponent, title: 'dashboard', canActivate: [authenticationGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' }
];

export default routes
