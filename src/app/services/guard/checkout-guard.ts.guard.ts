import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';

export const checkoutGuardTsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isproduct = localStorage.getItem("product");
  if(isproduct){
    return true;
  }else{
    router.navigate(['/']);
    return false;
  }
};
