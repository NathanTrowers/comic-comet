import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isLoggedIn()) {
    return true;
  }

  authenticationService.redirectUrl = router.getCurrentNavigation()?.initialUrl.toString();

  return router.parseUrl('/login');
};
