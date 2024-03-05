import { Routes } from '@angular/router';

import { LoginComponent } from 'src/app/authentication/login/login.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { authenticationGuard } from 'src/app/authentication/authentication.guard';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { SingleComicBookComponent } from 'src/app/comic-book/single-comic-book/single-comic-book.component';
import { OrderComponent } from 'src/app/order/order.component';
import { AddressConfirmationComponent } from 'src/app/order/address-confirmation/address-confirmation.component';
import { OrderConfirmationComponent } from 'src/app/order/order-confirmation/order-confirmation.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'comic-books', component: DashboardComponent, title: 'Comic Books', canActivate: [authenticationGuard] },
    { path: 'comic-book/:id', component: SingleComicBookComponent, title: 'Single Comic Book', canActivate: [authenticationGuard] },
    { path: 'cart', component: CartComponent, title: 'Cart', canActivate: [authenticationGuard] },
    { path: 'address-confirmation', component: AddressConfirmationComponent, title: 'Address Confirmation', canActivate: [authenticationGuard] },
    { path: 'order-confirmation', component: OrderConfirmationComponent, title: 'Order Confirmation', canActivate: [authenticationGuard] },
    { path: 'orders', component: OrderComponent, title: 'Order', canActivate: [authenticationGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' }
];

export default routes
