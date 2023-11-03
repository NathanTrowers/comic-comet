import { Routes } from '@angular/router';
import { LoginComponent } from "./authentication/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { authenticationGuard } from "./authentication/authentication.guard";
import { RegisterComponent } from './authentication/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'login' },
    { path: 'register', component: RegisterComponent, title: 'register' },
    { path: 'dashboard', component: DashboardComponent, title: 'dashboard', canActivate: [authenticationGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' }
];
