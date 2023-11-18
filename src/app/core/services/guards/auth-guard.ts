import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authServiceService = inject(AuthServiceService);
  const router = inject(Router);
  const isLoged = AuthServiceService.checkAuthentication();
  if(!isLoged) router.navigate(["/landing"]);
  return true;
};
