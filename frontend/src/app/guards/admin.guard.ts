import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core'; 
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service'; 

export const adminGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService); 
  const router = inject(Router); 

  if (tokenService.isTokenExpired()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = tokenService.getUserRole(); 

  if (userRole === 'admin') {
    return true;
  }


  router.navigate(['/products']);
  return false;
};
