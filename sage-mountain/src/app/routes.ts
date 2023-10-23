import { Routes } from "@angular/router";
import { LoginComponent } from "./authentication/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { authenticationGuard } from "./authentication/authentication.guard";

const routeConfig: Routes = [
    { path: 'login', component: LoginComponent, title: 'login' },
    { path: 'dashboard', component: DashboardComponent, title: 'dashboard', canActivate: [authenticationGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent }
];

export default routeConfig;
