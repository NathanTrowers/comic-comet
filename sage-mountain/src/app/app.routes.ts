import { Routes } from "@angular/router";

import { authenticationGuard } from "./authentication/authentication.guard";
import { LoginComponent } from "./authentication/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routeConfig: Routes = [
    { path: 'login', component: LoginComponent, title: 'login' },
    { path: 'dashboard', component: DashboardComponent, title: 'dashboard', canActivate: [authenticationGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, title:  'Page Not Found' }
];

export default routeConfig;
